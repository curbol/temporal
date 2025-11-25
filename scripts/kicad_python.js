/**
 * Utility module to find KiCad's bundled Python interpreter.
 * Can be reused by any script that needs to run Python code with KiCad's pcbnew API.
 */

const fs = require('fs');
const { execSync } = require('child_process');
const { glob } = require('glob');

/**
 * Find KiCad's bundled Python interpreter.
 * @returns {string|null} Path to Python executable, or null if not found
 */
function findKiCadPython() {
  // Search for Python in KiCad's Frameworks directory
  const pythonGlobPattern = '/Applications/KiCad/KiCad.app/Contents/Frameworks/Python.framework/Versions/*/bin/python*';

  try {
    const pythonPaths = glob.sync(pythonGlobPattern);

    // Filter to only include python3.x executables (not pythonw, python-config, etc.)
    const validPaths = pythonPaths.filter(path => {
      const basename = path.split('/').pop();
      return basename.match(/^python3(\.\d+)?$/);
    });

    if (validPaths.length === 0) {
      return null;
    }

    // Sort by version number (descending) and try each
    validPaths.sort().reverse();

    for (const pythonPath of validPaths) {
      // Verify that pcbnew is available
      try {
        execSync(`"${pythonPath}" -c "import pcbnew"`, {
          stdio: 'pipe'
        });
        // If we got here, pcbnew is available
        return pythonPath;
      } catch (err) {
        // Try next path
        continue;
      }
    }

    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Get KiCad's Python path or throw an error with instructions.
 * @returns {string} Path to Python executable
 * @throws {Error} If KiCad Python is not found
 */
function getKiCadPythonOrThrow() {
  const pythonPath = findKiCadPython();

  if (!pythonPath) {
    throw new Error(
      'KiCad Python not found.\n' +
      'Make sure KiCad is installed at /Applications/KiCad/KiCad.app\n' +
      'If KiCad is installed, try running it once to ensure Python is initialized.'
    );
  }

  return pythonPath;
}

module.exports = {
  findKiCadPython,
  getKiCadPythonOrThrow
};
