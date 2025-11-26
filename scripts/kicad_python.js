/**
 * Utility module to find KiCad's bundled Python interpreter.
 * Can be reused by any script that needs to run Python code with KiCad's pcbnew API.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { glob } = require('glob');

/**
 * Get platform-specific KiCad Python search patterns.
 * @returns {string[]} Array of glob patterns to search for Python
 */
function getKiCadPythonPatterns() {
  const platform = os.platform();

  if (platform === 'darwin') {
    // macOS
    return [
      '/Applications/KiCad/KiCad.app/Contents/Frameworks/Python.framework/Versions/*/bin/python*'
    ];
  } else if (platform === 'win32') {
    // Windows
    return [
      'C:/Program Files/KiCad/*/bin/python*.exe',
      'C:/Program Files (x86)/KiCad/*/bin/python*.exe',
      path.join(process.env.PROGRAMFILES || 'C:/Program Files', 'KiCad/*/bin/python*.exe')
    ];
  } else {
    // Linux and others
    return [
      '/usr/bin/python3',
      '/usr/local/bin/python3',
      path.join(os.homedir(), '.local/bin/python3')
    ];
  }
}

/**
 * Find KiCad's bundled Python interpreter.
 * @returns {string|null} Path to Python executable, or null if not found
 */
function findKiCadPython() {
  const patterns = getKiCadPythonPatterns();

  for (const pattern of patterns) {
    try {
      const pythonPaths = glob.sync(pattern);

      // Filter to only include python3.x executables (not pythonw, python-config, etc.)
      const validPaths = pythonPaths.filter(p => {
        const basename = path.basename(p, path.extname(p));
        return basename.match(/^python3(\.\d+)?$/);
      });

      if (validPaths.length === 0) {
        continue;
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
    } catch (err) {
      // Try next pattern
      continue;
    }
  }

  return null;
}

/**
 * Get KiCad's Python path or throw an error with instructions.
 * @returns {string} Path to Python executable
 * @throws {Error} If KiCad Python is not found
 */
function getKiCadPythonOrThrow() {
  const pythonPath = findKiCadPython();

  if (!pythonPath) {
    const platform = os.platform();
    let installMsg = '';

    if (platform === 'darwin') {
      installMsg = 'Make sure KiCad is installed at /Applications/KiCad/KiCad.app';
    } else if (platform === 'win32') {
      installMsg = 'Make sure KiCad is installed in Program Files';
    } else {
      installMsg = 'Make sure KiCad and python3-pcbnew are installed';
    }

    throw new Error(
      `KiCad Python not found.\n${installMsg}\n` +
      'If KiCad is installed, try running it once to ensure Python is initialized.'
    );
  }

  return pythonPath;
}

module.exports = {
  findKiCadPython,
  getKiCadPythonOrThrow
};
