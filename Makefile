# Build configuration
TOTAL_STEPS := 6

# Directory variables
ERGOGEN_DIR := ergogen
OUTPUT_DIR := $(ERGOGEN_DIR)/output
PCBS_DIR := pcbs
CASES_DIR := cases
GERBERS_DIR := gerbers
JLCPCB_DIR := jlcpcb
ASSETS_DIR := assets

# Platform-specific tooling
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Darwin)
SED_I := sed -i ''
KICAD_USER_DIR := $(HOME)/Documents/KiCad
PKG_INSTALL := brew install --cask
FONT_INSTALL := brew install --cask font-maple-mono-nf
else
SED_I := sed -i
KICAD_USER_DIR := $(HOME)/.local/share/kicad
PKG_INSTALL := sudo pacman -S --needed
FONT_INSTALL := yay -S --needed maplemono-nf
endif
.PHONY: deps gen convert gerbers assembly check clean

# Install all dependencies
deps:
	npm install
	@for entry in "openscad:openscad" "kicad-cli:kicad" "zip:zip" "unzip:unzip"; do \
		bin=$${entry%%:*}; pkg=$${entry##*:}; \
		if command -v $$bin >/dev/null 2>&1; then \
			echo "$$pkg already installed"; \
		else \
			echo "Installing $$pkg..."; \
			$(PKG_INSTALL) $$pkg || { echo "Could not install $$pkg automatically; install it manually and re-run 'make deps'."; exit 1; }; \
		fi; \
	done
	@if { command -v fc-list >/dev/null 2>&1 && fc-list : family | tr ',' '\n' | grep -qx "Maple Mono NF"; } || ls ~/Library/Fonts/MapleMono*NF* >/dev/null 2>&1; then \
		echo "Maple Mono NF font already installed"; \
	else \
		echo "Installing Maple Mono NF font..."; \
		$(FONT_INSTALL) || { echo "Could not install Maple Mono NF automatically; see https://github.com/subframe7536/maple-font"; exit 1; }; \
	fi
	@KICAD_PLUGINS=$$(ls -d $(KICAD_USER_DIR)/*/scripting/plugins 2>/dev/null | sort -V | tail -1); \
	if [ -z "$$KICAD_PLUGINS" ]; then \
		KICAD_VERSION_DIR=$$(ls -d $(KICAD_USER_DIR)/*/ 2>/dev/null | sort -V | tail -1); \
		if [ -n "$$KICAD_VERSION_DIR" ]; then \
			KICAD_PLUGINS="$${KICAD_VERSION_DIR}scripting/plugins"; \
			mkdir -p "$$KICAD_PLUGINS"; \
		fi; \
	fi; \
	if [ -z "$$KICAD_PLUGINS" ]; then \
		echo "Warning: KiCad user directory not found under $(KICAD_USER_DIR). Run KiCad once to create it, then re-run make deps."; \
	else \
		if [ -d "$$KICAD_PLUGINS/ViaStitching" ]; then \
			echo "ViaStitching plugin already installed"; \
		else \
			echo "Installing ViaStitching plugin..."; \
			TEMP_DIR=$$(mktemp -d); \
			git clone --depth 1 --filter=blob:none --sparse https://github.com/jsreynaud/kicad-action-scripts.git "$$TEMP_DIR" 2>/dev/null; \
			cd "$$TEMP_DIR" && git sparse-checkout set ViaStitching 2>/dev/null; \
			cp -r "$$TEMP_DIR/ViaStitching" "$$KICAD_PLUGINS/"; \
			rm -rf "$$TEMP_DIR"; \
			echo "ViaStitching plugin installed to $$KICAD_PLUGINS"; \
		fi; \
		FILL_AREA="$$KICAD_PLUGINS/ViaStitching/FillArea.py"; \
		$(SED_I) 's/dist = self.clearance + self.size \/ 2 + via.GetWidth() \/ 2/via_width = via.GetFrontWidth() if hasattr(via, "GetFrontWidth") else via.GetWidth()\n        dist = self.clearance + self.size \/ 2 + via_width \/ 2/' "$$FILL_AREA"; \
		$(SED_I) 's/clearance = max(track.GetOwnClearance(UNDEFINED_LAYER, ""), self.clearance, max_target_area_clearance) + (self.size \/ 2) + (track.GetWidth() \/ 2)/track_width = track.GetFrontWidth() if (isinstance(track, PCB_VIA) and hasattr(track, "GetFrontWidth")) else track.GetWidth()\n            clearance = max(track.GetOwnClearance(UNDEFINED_LAYER, ""), self.clearance, max_target_area_clearance) + (self.size \/ 2) + (track_width \/ 2)/' "$$FILL_AREA"; \
		MISSING=""; \
		grep -q 'via_width = via.GetFrontWidth()' "$$FILL_AREA" || MISSING="$$MISSING via-width"; \
		grep -q 'track_width = track.GetFrontWidth()' "$$FILL_AREA" || MISSING="$$MISSING track-width"; \
		if [ -n "$$MISSING" ]; then \
			echo "Error: ViaStitching KiCad 10 patch did not apply ($$MISSING) in $$FILL_AREA." >&2; \
			echo "Upstream FillArea.py has changed; update the sed patterns in the deps target." >&2; \
			exit 1; \
		fi; \
		echo "ViaStitching KiCad 10 compatibility patches verified"; \
	fi

# Generate keyboard PCBs and cases
gen:
	@set -e; \
	SECONDS=0; \
	step=0; \
	next() { step=$$((step + 1)); echo ""; echo "[$$step/$(TOTAL_STEPS)] $$1"; }; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo "  Temporal Keyboard Build"; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	$(MAKE) --no-print-directory clean; \
	next "Generating PCBs and cases with Ergogen..."; \
	npm run gen; \
	node scripts/generate_layout.js; \
	echo "✓ Ergogen generation complete"; \
	next "Post-processing PCB files..."; \
	node scripts/fix_edge_cuts.js; \
	node scripts/fix_silkscreen_width.js; \
	node scripts/add_ground_planes.js; \
	node scripts/create_text_keepouts.js; \
	node scripts/via_stitching.js; \
	node scripts/fill_zones.js; \
	node scripts/embed_fonts.js; \
	bash scripts/copy_pcb_if_missing.sh; \
	node scripts/setup_kicad_project.js; \
	node scripts/create_stealth_variants.js; \
	next "Generating preview assets..."; \
	mkdir -p $(ASSETS_DIR); \
	if [ -f $(OUTPUT_DIR)/outlines/preview.svg ]; then \
		sed -e 's/stroke="#000"/stroke="#e2725b"/g' -e 's/stroke:#000/stroke:#e2725b/g' $(OUTPUT_DIR)/outlines/preview.svg > $(ASSETS_DIR)/preview.svg; \
		echo "✓ Generated preview.svg"; \
	fi; \
	IMG_COUNT=0; \
	for pcb in $(PCBS_DIR)/*/*.kicad_pcb; do \
		case "$$(basename $$pcb)" in _autosave-*) continue;; esac; \
		if [ -f "$$pcb" ]; then \
			pcb_dir=$$(dirname "$$pcb"); \
			kicad-cli pcb render --output "$$pcb_dir/pcb.png" --width 1600 --height 900 --side top --background transparent "$$pcb" >/dev/null 2>&1; \
			IMG_COUNT=$$((IMG_COUNT + 1)); \
		fi; \
	done; \
	if [ $$IMG_COUNT -gt 0 ]; then \
		echo "✓ Generated $$IMG_COUNT PCB images"; \
	fi; \
	next "Generating gerber files..."; \
	$(MAKE) --no-print-directory gerbers; \
	next "Generating JLCPCB assembly files..."; \
	$(MAKE) --no-print-directory assembly; \
	next "Converting cases to STL (this can take a few minutes)..."; \
	$(MAKE) --no-print-directory convert; \
	echo ""; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"; \
	echo "✓ Build complete in $${SECONDS}s"; \
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Convert JSCAD files to STL
convert:
	@npm run convert
	@echo "✓ Converted cases to STL"

# Generate JLCPCB assembly files
assembly:
	@mkdir -p $(JLCPCB_DIR)
	@node scripts/generate_jlcpcb_files.js

# Generate gerbers for all PCBs and zip them
gerbers:
	@mkdir -p $(GERBERS_DIR)
	@set -e; \
	for pcb in $(PCBS_DIR)/*/*.kicad_pcb; do \
		[ -f "$$pcb" ] || continue; \
		case "$$(basename $$pcb)" in _autosave-*) continue;; esac; \
		pcb_name=$$(basename "$$pcb" .kicad_pcb); \
		rm -rf $(GERBERS_DIR)/$$pcb_name; \
		mkdir -p $(GERBERS_DIR)/$$pcb_name; \
		kicad-cli pcb export gerbers --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb" >/dev/null; \
		kicad-cli pcb export drill --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb" >/dev/null; \
	done
	@set -e; \
	ZIP_COUNT=0; \
	for dir in $(GERBERS_DIR)/*/; do \
		[ -d "$$dir" ] || continue; \
		pcb_name=$$(basename "$$dir"); \
		rm -f $(GERBERS_DIR)/$$pcb_name.zip; \
		(cd $(GERBERS_DIR) && zip -r $$pcb_name.zip $$pcb_name/ >/dev/null); \
		rm -rf $(GERBERS_DIR)/$$pcb_name; \
		ZIP_COUNT=$$((ZIP_COUNT + 1)); \
	done; \
	if [ $$ZIP_COUNT -gt 0 ]; then \
		echo "✓ Generated and zipped $$ZIP_COUNT gerber packages"; \
	fi

# Verify the sources parse, the config builds, the boards pass DRC with every
# silkscreen face resolving, the pours in pcbs/ still match the current DRC rules
# and zone settings,
# and every committed derived artifact still matches what its source produces:
# temporal.json, the JLCPCB files, the KiCad project and rule files, the stealth
# top plates, and the gerbers
check:
	@set -e; \
	for f in scripts/*.js ergogen/footprints/ceoloide/*.js; do node --check "$$f"; done; \
	python3 -m py_compile scripts/*.py; \
	bash -n scripts/copy_pcb_if_missing.sh; \
	node -e "const y=require('js-yaml'),f=require('fs');y.load(f.readFileSync('ergogen/config.yaml','utf8'));y.load(f.readFileSync('scripts/kicad_config.yaml','utf8'))"; \
	echo "✓ Sources parse"
	@npm run --silent lint && echo "✓ Lint clean"
	@npm run gen >/dev/null && echo "✓ Ergogen config builds"
	@set -e; \
	DRC_LOG=$$(mktemp); \
	for pcb in $(PCBS_DIR)/*/*.kicad_pcb; do \
		case "$$(basename $$pcb)" in _autosave-*) continue;; esac; \
		kicad-cli pcb drc --severity-error --exit-code-violations -o /dev/null "$$pcb" >>"$$DRC_LOG" 2>&1 \
			|| { echo "DRC errors: $$pcb"; cat "$$DRC_LOG"; rm -f "$$DRC_LOG"; exit 1; }; \
	done; \
	echo "✓ All boards pass DRC"; \
	if grep -q "substituting" "$$DRC_LOG"; then \
		echo "Error: a silkscreen font face did not resolve, so this board does not carry its own font:" >&2; \
		grep "substituting" "$$DRC_LOG" | sed 's/^[^ ]* [^ ]* //' | sort -u >&2; \
		rm -f "$$DRC_LOG"; \
		exit 1; \
	fi; \
	rm -f "$$DRC_LOG"; \
	for pcb in $(PCBS_DIR)/*/*.kicad_pcb; do \
		case "$$(basename $$pcb)" in _autosave-*) continue;; esac; \
		grep -q '(face ' "$$pcb" || continue; \
		grep -q '(embedded_fonts yes)' "$$pcb" && grep -qi '(name "[^"]*\.ttf"' "$$pcb" \
			|| { echo "Error: $$pcb names a font face but embeds no font, so its silkscreen depends on the host" >&2; exit 1; }; \
	done; \
	echo "✓ Boards carry their own silkscreen fonts"
	@node scripts/check_zone_fills.js
	@node scripts/check_zone_settings.js
	@set -e; \
	SNAPSHOT=$$(mktemp -d); \
	trap 'rm -rf "$$SNAPSHOT"' EXIT; \
	cp temporal.json "$$SNAPSHOT/"; \
	cp -r $(JLCPCB_DIR) "$$SNAPSHOT/"; \
	for f in $(PCBS_DIR)/*/*.kicad_dru $(PCBS_DIR)/*/*.kicad_pro $(PCBS_DIR)/*_stealth/*.kicad_pcb; do \
		mkdir -p "$$SNAPSHOT/proj/$$(basename $$(dirname $$f))"; \
		cp "$$f" "$$SNAPSHOT/proj/$$(basename $$(dirname $$f))/"; \
	done; \
	trap 'cp "$$SNAPSHOT/temporal.json" temporal.json; \
	      rm -rf $(JLCPCB_DIR); cp -r "$$SNAPSHOT/$(JLCPCB_DIR)" $(JLCPCB_DIR); \
	      cp -r "$$SNAPSHOT/proj/." $(PCBS_DIR)/; \
	      rm -rf "$$SNAPSHOT"' EXIT; \
	node scripts/generate_layout.js >/dev/null; \
	$(MAKE) --no-print-directory assembly >/dev/null; \
	node scripts/setup_kicad_project.js >/dev/null; \
	node scripts/create_stealth_variants.js >/dev/null; \
	STALE=""; \
	diff -q "$$SNAPSHOT/temporal.json" temporal.json >/dev/null || STALE="temporal.json"; \
	diff -rq "$$SNAPSHOT/$(JLCPCB_DIR)" $(JLCPCB_DIR) >/dev/null || STALE="$$STALE $(JLCPCB_DIR)/"; \
	for dru in $(PCBS_DIR)/*/*.kicad_dru; do \
		diff -q "$$SNAPSHOT/proj/$$(basename $$(dirname $$dru))/$$(basename $$dru)" "$$dru" >/dev/null \
			|| STALE="$$STALE $$dru"; \
	done; \
	for pcb in $(PCBS_DIR)/*_stealth/*.kicad_pcb; do \
		diff -q "$$SNAPSHOT/proj/$$(basename $$(dirname $$pcb))/$$(basename $$pcb)" "$$pcb" >/dev/null \
			|| STALE="$$STALE $$pcb"; \
	done; \
	node scripts/check_kicad_pro.js "$$SNAPSHOT/proj" || STALE="$$STALE .kicad_pro"; \
	if [ -n "$$STALE" ]; then \
		echo "Error: derived artifacts are stale:$$STALE" >&2; \
		echo "Run 'make gen' and commit the result." >&2; \
		exit 1; \
	fi; \
	echo "✓ Derived artifacts reproduce"
# Every exporter stamp differs between the machine that committed the zips and
# the one re-exporting them. The .gbr and .drl files carry the KiCad build on a
# GenerationSoftware line, but the .gbrjob is JSON, so its build sits one level
# in on a "Version" line of its own and needs matching separately.
	@set -e; \
	TMP=$$(mktemp -d); \
	trap 'rm -rf "$$TMP"' EXIT; \
	VOLATILE='/CreationDate|Created by KiCad|GenerationSoftware|"Version"|DRILL file KiCad/d'; \
	STALE=""; \
	for pcb in $(PCBS_DIR)/*/*.kicad_pcb; do \
		case "$$(basename $$pcb)" in _autosave-*) continue;; esac; \
		name=$$(basename "$$pcb" .kicad_pcb); \
		[ -f $(GERBERS_DIR)/$$name.zip ] || { STALE="$$STALE $$name.zip(missing)"; continue; }; \
		mkdir -p "$$TMP/new/$$name" "$$TMP/old"; \
		kicad-cli pcb export gerbers --output "$$TMP/new/$$name/" "$$pcb" >/dev/null; \
		kicad-cli pcb export drill --output "$$TMP/new/$$name/" "$$pcb" >/dev/null; \
		unzip -q -o $(GERBERS_DIR)/$$name.zip -d "$$TMP/old"; \
		for f in "$$TMP/new/$$name"/*; do \
			b=$$(basename "$$f"); \
			o="$$TMP/old/$$name/$$b"; \
			[ -f "$$o" ] || { STALE="$$STALE $$name.zip"; break; }; \
			sed -E "$$VOLATILE" "$$f" >"$$TMP/a"; \
			sed -E "$$VOLATILE" "$$o" >"$$TMP/b"; \
			diff -q "$$TMP/a" "$$TMP/b" >/dev/null || { STALE="$$STALE $$name.zip"; break; }; \
		done; \
	done; \
	if [ -n "$$STALE" ]; then \
		echo "Error: gerber zips do not match the boards in $(PCBS_DIR)/:$$STALE" >&2; \
		echo "Run 'make gerbers' and commit the result." >&2; \
		exit 1; \
	fi; \
	echo "✓ Gerbers match the committed boards"

# Clean generated output
clean:
	@rm -rf $(OUTPUT_DIR)
	@find $(CASES_DIR) -mindepth 1 -maxdepth 1 ! -name README.md -exec rm -rf {} + 2>/dev/null || true
	@rm -rf $(GERBERS_DIR)
	@rm -rf $(JLCPCB_DIR)
	@find $(PCBS_DIR) -mindepth 1 -maxdepth 1 ! -name temporal -exec rm -rf {} + 2>/dev/null || true
