#!/bin/bash

# Scholar Project Management Script

set -e # Exit on error

function show_help() {
    echo "Usage: ./main.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev          Start both Next.js and Python backend in development mode"
    echo "  build        Build the entire project for production"
    echo "  db:push      Push database schema changes (Drizzle)"
    echo "  db:studio    Open Drizzle Studio"
    echo "  docs         Generate project documentation"
    echo "  clean        Remove node_modules and build artifacts"
    echo "  help         Show this help message"
}

function dev() {
    echo "Starting development environment..."
    # Run Next.js and Python in parallel
    (cd website && npm run dev) & \
    (cd backend && source venv/bin/activate && python server.py)
}

function build() {
    echo "Building website..."
    (cd website && npm run build)
    echo "Building backend..."
    # Add backend build/dependency steps here
}

function db_push() {
    echo "Syncing database schema..."
    (cd website && npx drizzle-kit push)
}

function generate_docs() {
    echo "Generating documentation..."
    npx typedoc --options website/typedoc.json
}

function clean() {
    echo "Cleaning project..."
    find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
    find . -name ".next" -type d -prune -exec rm -rf '{}' +
    find . -name "__pycache__" -type d -prune -exec rm -rf '{}' +
}

case "$1" in
    dev)
        dev
        ;;
    build)
        build
        ;;
    db:push)
        db_push
        ;;
    db:studio)
        (cd website && npx drizzle-kit studio)
        ;;
    docs)
        generate_docs
        ;;
    clean)
        clean
        ;;
    help|*)
        show_help
        ;;
esac