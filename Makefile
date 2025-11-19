# Directory variables
ERGOGEN_DIR := ergogen
OUTPUT_DIR := $(ERGOGEN_DIR)/output
PCBS_DIR := $(OUTPUT_DIR)/pcbs
PCB_DIR := pcb
CASES_DIR := cases
GERBERS_DIR := gerbers
MIRROR_SCAD := $(ERGOGEN_DIR)/mirror_case.scad

.PHONY: deps gen convert mirror gerbers clean

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

# Generate keyboard PCBs and cases
gen:
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "  Temporal Keyboard Build"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo ""
	@$(MAKE) clean
	@echo "[1/5] Generating PCBs and cases with Ergogen..."
	@npm run gen 2>/dev/null || npm run gen
	@echo "✓ Ergogen generation complete"
	@echo ""
	@echo "[2/5] Post-processing PCB files..."
	@node scripts/fix_edge_cuts.js
	@node scripts/add_ground_planes.js
	@bash scripts/copy_pcb_if_missing.sh
	@node scripts/setup_kicad_project.js
	@echo ""
	@echo "[3/5] Converting cases to STL..."
	@$(MAKE) convert
	@echo ""
	@echo "[4/5] Mirroring case files..."
	@$(MAKE) mirror
	@echo ""
	@echo "[5/5] Generating gerber files..."
	@$(MAKE) gerbers
	@echo ""
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	@echo "✓ Build complete!"
	@echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Convert JSCAD files to STL
convert:
	@npm run convert 2>/dev/null || npm run convert
	@echo "✓ Converted cases to STL"

# Mirror case STL files for right-hand versions
mirror:
	@MIRRORED=0; \
	if [ -f $(CASES_DIR)/temporal_38.stl ]; then \
		openscad -o $(CASES_DIR)/temporal_38_mirror.stl -D "input=\"$$(pwd)/$(CASES_DIR)/temporal_38.stl\"" $(MIRROR_SCAD) >/dev/null 2>&1; \
		MIRRORED=$$((MIRRORED + 1)); \
	fi; \
	if [ -f $(CASES_DIR)/temporal_40.stl ]; then \
		openscad -o $(CASES_DIR)/temporal_40_mirror.stl -D "input=\"$$(pwd)/$(CASES_DIR)/temporal_40.stl\"" $(MIRROR_SCAD) >/dev/null 2>&1; \
		MIRRORED=$$((MIRRORED + 1)); \
	fi; \
	if [ -f $(CASES_DIR)/temporal_42.stl ]; then \
		openscad -o $(CASES_DIR)/temporal_42_mirror.stl -D "input=\"$$(pwd)/$(CASES_DIR)/temporal_42.stl\"" $(MIRROR_SCAD) >/dev/null 2>&1; \
		MIRRORED=$$((MIRRORED + 1)); \
	fi; \
	if [ -f $(CASES_DIR)/temporal_44.stl ]; then \
		openscad -o $(CASES_DIR)/temporal_44_mirror.stl -D "input=\"$$(pwd)/$(CASES_DIR)/temporal_44.stl\"" $(MIRROR_SCAD) >/dev/null 2>&1; \
		MIRRORED=$$((MIRRORED + 1)); \
	fi; \
	if [ $$MIRRORED -gt 0 ]; then \
		echo "✓ Mirrored $$MIRRORED case files"; \
	fi

# Generate gerbers for all PCBs and zip them
gerbers:
	@mkdir -p $(GERBERS_DIR)
	@for pcb in $(PCBS_DIR)/*.kicad_pcb; do \
		if [ -f "$$pcb" ]; then \
			pcb_name=$$(basename "$$pcb" .kicad_pcb); \
			mkdir -p $(GERBERS_DIR)/$$pcb_name; \
			kicad-cli pcb export gerbers --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb" >/dev/null 2>&1; \
			kicad-cli pcb export drill --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb" >/dev/null 2>&1; \
		fi \
	done
	@if [ -f $(PCB_DIR)/temporal.kicad_pcb ]; then \
		rm -rf $(GERBERS_DIR)/temporal; \
		mkdir -p $(GERBERS_DIR)/temporal; \
		kicad-cli pcb export gerbers --output $(GERBERS_DIR)/temporal/ "$(PCB_DIR)/temporal.kicad_pcb" >/dev/null 2>&1; \
		kicad-cli pcb export drill --output $(GERBERS_DIR)/temporal/ "$(PCB_DIR)/temporal.kicad_pcb" >/dev/null 2>&1; \
	fi
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
