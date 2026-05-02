# Directory Independence Implementation Guide

## Overview

The project has been updated to be **directory-independent**, meaning it can be installed and run from any directory on your system without requiring hardcoded path modifications.

## What Changed

### 1. **Dynamic Path Detection System**

A new utility script `scripts/get-project-root.sh` dynamically detects the project's root directory at runtime:

```bash
#!/bin/bash
# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Return the parent directory (project root)
echo "$(dirname "$SCRIPT_DIR")"
```

### 2. **Updated Configuration Files**

All configuration files that previously had hardcoded paths now use dynamic detection:

- `ecosystem.config.js` - PM2 production configuration
- `ecosystem.config.dev.js` - PM2 development configuration

**Before:**
```javascript
cwd: '/home/kopen/combined/website'
```

**After:**
```javascript
const PROJECT_ROOT = getProjectRoot();
cwd: path.join(PROJECT_ROOT, 'website')
```

### 3. **Updated Shell Scripts**

All shell scripts now detect their location dynamically:

- `start-local.sh`
- `stop-local.sh`
- `start-pm2.sh` (already had dynamic detection)
- `stop-pm2.sh`
- `restart-pm2.sh` (already had dynamic detection)
- `view-logs.sh`

**Pattern used in all scripts:**
```bash
# Dynamically detect project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$SCRIPT_DIR"

# Alternative: Use the get-project-root.sh script if available
if [ -f "$BASE_DIR/scripts/get-project-root.sh" ]; then
    DETECTED_ROOT="$(bash "$BASE_DIR/scripts/get-project-root.sh")"
    if [ -n "$DETECTED_ROOT" ]; then
        BASE_DIR="$DETECTED_ROOT"
    fi
fi
```

## How It Works

### For Bash Scripts

1. Script detects its own location using `$(dirname "${BASH_SOURCE[0]}")`
2. Sets `BASE_DIR` to the script's directory
3. Optionally uses `scripts/get-project-root.sh` for additional validation
4. All paths are built relative to `BASE_DIR`

### For Node.js/PM2 Configurations

1. Uses `__dirname` to get the config file's directory
2. Executes `scripts/get-project-root.sh` to find project root
3. Falls back to `process.cwd()` if detection fails
4. Builds all paths using `path.join(PROJECT_ROOT, ...)`

## Installation & Usage

### Installing in a New Directory

```bash
# Clone or copy the project to any directory
git clone https://github.com/Cyberverse-cent0/combined-project.git /opt/my-projects/combined
cd /opt/my-projects/combined

# The project will automatically detect it's in /opt/my-projects/combined
# No path modifications needed!

# Start services
./start-local.sh
# or
./start-pm2.sh
```

### Moving an Existing Installation

```bash
# Simply copy the entire directory to a new location
cp -r /old/location/combined /new/location/combined
cd /new/location/combined

# Everything works automatically
./start-local.sh
```

## Benefits

1. **Portability**: Move the project anywhere without breaking paths
2. **Easy Deployment**: No need to edit configuration files for different environments
3. **Multi-User Support**: Different users can install in their home directories
4. **CI/CD Friendly**: Works in any build environment
5. **Docker Compatible**: Paths adjust automatically in containers

## Verification

To verify the dynamic detection is working:

```bash
# Test the detection script
./scripts/get-project-root.sh

# Should output the current project directory
# Example: /home/user/my-projects/combined

# Test a startup script (it will show the detected path)
./start-local.sh
```

## Troubleshooting

### If paths aren't detected correctly:

1. **Check script permissions**:
   ```bash
   chmod +x scripts/get-project-root.sh
   chmod +x start-local.sh
   chmod +x stop-local.sh
   ```

2. **Verify bash is available**:
   ```bash
   which bash
   ```

3. **Test detection manually**:
   ```bash
   bash scripts/get-project-root.sh
   ```

4. **Check for symlinks**: If the project is accessed through symlinks, the detection will follow them to the real path.

## Technical Details

### Detection Priority

1. **Primary**: Script's own directory location (`BASH_SOURCE[0]`)
2. **Secondary**: `scripts/get-project-root.sh` output
3. **Fallback**: Current working directory (`process.cwd()` for Node.js)

### Path Construction

All paths are constructed using:
- **Bash**: `"$BASE_DIR/subdirectory/file"`
- **Node.js**: `path.join(PROJECT_ROOT, 'subdirectory', 'file')`

This ensures cross-platform compatibility and proper path separators.

## Files Modified

### Core Detection
- `scripts/get-project-root.sh` (NEW)

### Configuration Files
- `ecosystem.config.js`
- `ecosystem.config.dev.js`

### Shell Scripts
- `start-local.sh`
- `stop-local.sh`
- `stop-pm2.sh`
- `view-logs.sh`

### Already Dynamic (No Changes Needed)
- `start-pm2.sh`
- `restart-pm2.sh`

## Migration Guide

If you have an existing installation with hardcoded paths:

1. **Pull the latest changes**:
   ```bash
   cd /your/existing/path/combined
   git pull origin main
   ```

2. **Verify no custom path modifications**:
   ```bash
   grep -r "/home/kopen/combined" . --exclude-dir=node_modules --exclude-dir=.git
   ```

3. **Test the new system**:
   ```bash
   ./stop-pm2.sh  # Stop existing services
   ./start-local.sh  # Start with new dynamic detection
   ```

4. **Everything should work identically**, but now you can move the directory!

## Future Considerations

When adding new scripts or configuration files:

1. **For shell scripts**: Use the pattern shown above
2. **For Node.js files**: Use `path.join()` with dynamic root detection
3. **Never hardcode absolute paths** to the project directory
4. **Test** by moving the project to a different directory

## Support

If you encounter any issues with directory independence:

1. Check that all scripts have execute permissions
2. Verify bash is available at `/usr/bin/bash`
3. Ensure the `scripts/get-project-root.sh` file exists and is executable
4. Review the detection logic in the specific script having issues

---

**Last Updated**: 2026-04-28  
**Version**: 1.0.0