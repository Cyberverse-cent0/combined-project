#!/bin/bash
# Utility script to detect the project root directory dynamically
# This script finds the directory containing this file and returns the parent directory

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Return the parent directory (project root)
echo "$(dirname "$SCRIPT_DIR")"