#!/bin/bash

# Project Root Detection Utility
# This script detects the project root directory and exports it as PROJECT_ROOT

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate up to find the project root (contains apps/, deployment/, docs/)
PROJECT_ROOT="$SCRIPT_DIR/../../.."

# Resolve to absolute path
PROJECT_ROOT="$(cd "$PROJECT_ROOT" && pwd)"

# Export for use in other scripts
export PROJECT_ROOT

# Return the project root path
echo "$PROJECT_ROOT"
