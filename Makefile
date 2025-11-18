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
	pip3 install -r requirements.txt
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
	$(MAKE) clean
	npm run gen
	@echo "Post-processing PCB files..."
	python3 scripts/fix_edge_cuts.py
	python3 scripts/add_ground_planes.py
	bash scripts/copy_pcb_if_missing.sh
	@echo "Setting up KiCad project files with defaults..."
	python3 scripts/setup_kicad_project.py
	$(MAKE) convert
	$(MAKE) mirror
	$(MAKE) gerbers

# Convert JSCAD files to STL
convert:
	npm run convert

# Mirror case STL files for right-hand versions
mirror:
	@echo "Mirroring case files..."
	@if [ -f $(CASES_DIR)/temporal.stl ]; then \
		openscad -o $(CASES_DIR)/temporal_mirror.stl -D "input=\"$$(pwd)/$(CASES_DIR)/temporal.stl\"" $(MIRROR_SCAD); \
		echo "Created temporal_mirror.stl"; \
	else \
		echo "Warning: $(CASES_DIR)/temporal.stl not found"; \
	fi
	@if [ -f $(CASES_DIR)/temporal_small.stl ]; then \
		openscad -o $(CASES_DIR)/temporal_small_mirror.stl -D "input=\"$$(pwd)/$(CASES_DIR)/temporal_small.stl\"" $(MIRROR_SCAD); \
		echo "Created temporal_small_mirror.stl"; \
	else \
		echo "Warning: $(CASES_DIR)/temporal_small.stl not found"; \
	fi

# Generate gerbers for all PCBs and zip them
gerbers:
	@echo "Generating gerbers..."
	@mkdir -p $(GERBERS_DIR)
	@for pcb in $(PCBS_DIR)/*.kicad_pcb; do \
		if [ -f "$$pcb" ]; then \
			pcb_name=$$(basename "$$pcb" .kicad_pcb); \
			echo "Processing $$pcb_name..."; \
			mkdir -p $(GERBERS_DIR)/$$pcb_name; \
			kicad-cli pcb export gerbers --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb"; \
			kicad-cli pcb export drill --output $(GERBERS_DIR)/$$pcb_name/ "$$pcb"; \
		fi \
	done
	@if [ -f $(PCB_DIR)/temporal.kicad_pcb ]; then \
		echo "Processing manual temporal PCB..."; \
		rm -rf $(GERBERS_DIR)/temporal; \
		mkdir -p $(GERBERS_DIR)/temporal; \
		kicad-cli pcb export gerbers --output $(GERBERS_DIR)/temporal/ "$(PCB_DIR)/temporal.kicad_pcb"; \
		kicad-cli pcb export drill --output $(GERBERS_DIR)/temporal/ "$(PCB_DIR)/temporal.kicad_pcb"; \
	fi
	@echo "Zipping gerbers..."
	@for dir in $(GERBERS_DIR)/*/; do \
		if [ -d "$$dir" ]; then \
			pcb_name=$$(basename "$$dir"); \
			echo "Zipping $$pcb_name..."; \
			cd $(GERBERS_DIR) && zip -r $$pcb_name.zip $$pcb_name/ && cd ..; \
			rm -rf $(GERBERS_DIR)/$$pcb_name; \
		fi \
	done
	@echo "Gerbers zipped in $(GERBERS_DIR)/"

# Clean generated output
clean:
	rm -rf $(OUTPUT_DIR)
	rm -rf $(CASES_DIR)
	rm -rf $(GERBERS_DIR)
