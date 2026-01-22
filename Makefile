# Build configuration
TOTAL_STEPS := 6

# Directory variables
ERGOGEN_DIR := ergogen
OUTPUT_DIR := $(ERGOGEN_DIR)/output
PCBS_DIR := pcbs
TEMPORAL_DIR := temporal
CASES_DIR := cases
GERBERS_DIR := gerbers
JLCPCB_DIR := jlcpcb
ASSETS_DIR := assets
.PHONY: deps gen convert gerbers assembly clean

# Install all dependencies
deps:
	npm install
	@if ! command -v openscad >/dev/null 2>&1; then \
		echo "Installing OpenSCAD..."; \
		brew install --cask openscad; \
	else \
		echo "OpenSCAD already installed"; \
	fi
	@if ! command -v kicad-cli >/dev/null 2>&1; then \
		echo "Installing KiCad..."; \
		brew install --cask kicad; \
	else \
		echo "KiCad already installed"; \
	fi
	@if ! command -v inkscape >/dev/null 2>&1; then \
		echo "Installing Inkscape..."; \
		brew install --cask inkscape; \
	else \
		echo "Inkscape already installed"; \
	fi
	@if ls ~/Library/Fonts/MapleMono*NF* >/dev/null 2>&1; then \
		echo "Maple Mono NF font already installed"; \
	else \
		echo "Installing Maple Mono NF font..."; \
		brew install --cask font-maple-mono-nf; \
	fi
	@KICAD_PLUGINS=$$(ls -d ~/Documents/KiCad/*/scripting/plugins 2>/dev/null | head -1); \
	if [ -z "$$KICAD_PLUGINS" ]; then \
		echo "Warning: KiCad plugins directory not found. Run KiCad once to create it, then re-run make deps."; \
	elif [ -d "$$KICAD_PLUGINS/ViaStitching" ]; then \
		echo "ViaStitching plugin already installed"; \
	else \
		echo "Installing ViaStitching plugin..."; \
		TEMP_DIR=$$(mktemp -d); \
		git clone --depth 1 --filter=blob:none --sparse https://github.com/jsreynaud/kicad-action-scripts.git "$$TEMP_DIR" 2>/dev/null; \
		cd "$$TEMP_DIR" && git sparse-checkout set ViaStitching 2>/dev/null; \
		cp -r "$$TEMP_DIR/ViaStitching" "$$KICAD_PLUGINS/"; \
		rm -rf "$$TEMP_DIR"; \
		echo "Applying KiCad 9 compatibility fix..."; \
		sed -i '' 's/dist = self.clearance + self.size \/ 2 + via.GetWidth() \/ 2/via_width = via.GetFrontWidth() if hasattr(via, "GetFrontWidth") else via.GetWidth()\n        dist = self.clearance + self.size \/ 2 + via_width \/ 2/' "$$KICAD_PLUGINS/ViaStitching/FillArea.py"; \
		sed -i '' 's/clearance = max(track.GetOwnClearance(UNDEFINED_LAYER, ""), self.clearance, max_target_area_clearance) + (self.size \/ 2) + (track.GetWidth() \/ 2)/track_width = track.GetFrontWidth() if (isinstance(track, PCB_VIA) and hasattr(track, "GetFrontWidth")) else track.GetWidth()\n            clearance = max(track.GetOwnClearance(UNDEFINED_LAYER, ""), self.clearance, max_target_area_clearance) + (self.size \/ 2) + (track_width \/ 2)/' "$$KICAD_PLUGINS/ViaStitching/FillArea.py"; \
		echo "ViaStitching plugin installed to $$KICAD_PLUGINS"; \
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
	npm run gen 2>/dev/null || npm run gen; \
	node scripts/generate_layout.js; \
	echo "✓ Ergogen generation complete"; \
	next "Post-processing PCB files..."; \
	node scripts/fix_edge_cuts.js; \
	node scripts/add_ground_planes.js; \
	node scripts/create_text_keepouts.js; \
	node scripts/via_stitching.js; \
	node scripts/fill_zones.js; \
	bash scripts/copy_pcb_if_missing.sh; \
	node scripts/setup_kicad_project.js; \
	next "Generating preview assets..."; \
	mkdir -p $(ASSETS_DIR); \
	if [ -f $(OUTPUT_DIR)/outlines/preview.svg ]; then \
		sed -e 's/stroke="#000"/stroke="#e2725b"/g' -e 's/stroke:#000/stroke:#e2725b/g' $(OUTPUT_DIR)/outlines/preview.svg > $(ASSETS_DIR)/preview.svg; \
		echo "✓ Generated preview.svg"; \
	fi; \
	IMG_COUNT=0; \
	for pcb in $(PCBS_DIR)/*/*.kicad_pcb; do \
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
	@for pcb in $(PCBS_DIR)/**/*.kicad_pcb; do \
		if [ -f "$$pcb" ]; then \
			pcb_name=$$(basename "$$pcb" .kicad_pcb); \
			mkdir -p $(GERBERS_DIR)/$$pcb_name; \
			kicad-cli pcb export gerbers --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb" >/dev/null 2>&1; \
			kicad-cli pcb export drill --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb" >/dev/null 2>&1; \
		fi \
	done
	@ZIP_COUNT=0; \
	for dir in $(GERBERS_DIR)/*/; do \
		if [ -d "$$dir" ]; then \
			pcb_name=$$(basename "$$dir"); \
			cd $(GERBERS_DIR) && zip -r $$pcb_name.zip $$pcb_name/ >/dev/null 2>&1 && cd ..; \
			rm -rf $(GERBERS_DIR)/$$pcb_name; \
			ZIP_COUNT=$$((ZIP_COUNT + 1)); \
		fi \
	done; \
	if [ $$ZIP_COUNT -gt 0 ]; then \
		echo "✓ Generated and zipped $$ZIP_COUNT gerber packages"; \
	fi

# Clean generated output
clean:
	@rm -rf $(OUTPUT_DIR)
	@rm -rf $(CASES_DIR)
	@rm -rf $(GERBERS_DIR)
	@rm -rf $(JLCPCB_DIR)
	@find $(PCBS_DIR) -mindepth 1 -maxdepth 1 ! -name '$(TEMPORAL_DIR)' -exec rm -rf {} + 2>/dev/null || true
