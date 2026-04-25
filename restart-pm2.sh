#!/bin/bash

# PM2 Restart Script
# Restarts all services with zero-downtime (graceful reload)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { printf "${GREEN}[INFO]${NC} %s\n" "$1"; }
error() { printf "${RED}[ERROR]${NC} %s\n" "$1" >&2; exit 1; }

BASE_DIR="/home/codecrafter/Documents/combined"
cd "$BASE_DIR"

log "Restarting all PM2 processes (graceful reload)..."
pm2 reload all

log "Saving PM2 configuration..."
pm2 save

log "All services restarted successfully"
log ""
log "📊 Current status:"
pm2 status
