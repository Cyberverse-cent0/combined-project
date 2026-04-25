#!/bin/bash

# PM2 Monitor Script
# Displays real-time monitoring of all services

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { printf "${GREEN}[INFO]${NC} %s\n" "$1"; }

BASE_DIR="/home/codecrafter/Documents/combined"
cd "$BASE_DIR"

log "Starting PM2 monitoring dashboard..."
log "Press Ctrl+C to exit"
log ""

pm2 monit
