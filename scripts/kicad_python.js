/**
 * Locate an interpreter that can import pcbnew. KiCad ships its own Python on
 * macOS and Windows; on Linux the system python3 carries the bindings.
 */

const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const { glob } = require('glob');

function getKiCadPythonPatterns() {
  const platform = os.platform();

  if (platform === 'darwin') {
    return [
      '/Applications/KiCad/KiCad.app/Contents/Frameworks/Python.framework/Versions/*/bin/python*'
    ];
  } else if (platform === 'win32') {
    return [
      'C:/Program Files/KiCad/*/bin/python*.exe',
      'C:/Program Files (x86)/KiCad/*/bin/python*.exe',
      path.join(process.env.PROGRAMFILES || 'C:/Program Files', 'KiCad/*/bin/python*.exe')
    ];
  } else {
    return [
      '/usr/bin/python3',
      '/usr/local/bin/python3',
      path.join(os.homedir(), '.local/bin/python3')
    ];
  }
}

function findKiCadPython() {
  const patterns = getKiCadPythonPatterns();

  for (const pattern of patterns) {
    try {
      const pythonPaths = glob.sync(pattern);

      // Excludes pythonw, python-config and the like.
      const validPaths = pythonPaths.filter(p => {
        const basename = path.basename(p, path.extname(p));
        return basename.match(/^python3(\.\d+)?$/);
      });

      if (validPaths.length === 0) {
        continue;
      }

      // Highest-sorting name first.
      validPaths.sort().reverse();

      for (const pythonPath of validPaths) {
        try {
          execSync(`"${pythonPath}" -c "import pcbnew"`, {
            stdio: 'pipe'
          });
          return pythonPath;
        } catch {
          continue;
        }
      }
    } catch {
      continue;
    }
  }

  return null;
}

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
