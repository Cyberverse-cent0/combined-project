#!/bin/bash

# Start Scholar Forge Script
# This script starts the Scholar Forge application on port 4500

echo "🎓 Starting Scholar Forge..."
echo "=========================="

# Navigate to Scholar Forge directory
cd "$(dirname "$0")/../Schoolars-work-bench"

# Check if the directory exists
if [ ! -d "." ]; then
    echo "❌ Error: Schoolars-work-bench directory not found"
    echo "Please ensure the Scholar Forge project is in the correct location"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in Schoolars-work-bench directory"
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🚀 Starting Scholar Forge on port 4500..."
# Start the development server
if command -v pnpm &> /dev/null; then
    pnpm run dev
else
    echo "❌ Error: pnpm not found. Please install pnpm first:"
    echo "npm install -g pnpm"
    exit 1
fi
