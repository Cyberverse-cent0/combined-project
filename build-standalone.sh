#!/bin/bash
# Build Standalone Deployment Package
# Creates a self-contained package ready for deployment

set -e

PROJECT_NAME="stephenasatsa"
VERSION="$(date +%Y%m%d-%H%M%S)"
PACKAGE_NAME="${PROJECT_NAME}-${VERSION}"
BUILD_DIR="/tmp/${PACKAGE_NAME}"
OUTPUT_DIR="/home/codecrafter/Documents/combined/standalone-bin"

echo "Building standalone deployment package..."

# Clean and create build directory
rm -rf "$BUILD_DIR" "$OUTPUT_DIR"
mkdir -p "$BUILD_DIR" "$OUTPUT_DIR"

# 1. Copy frontend build
echo "[1/6] Copying frontend build..."
mkdir -p "$BUILD_DIR/apps/website"
cp -r /home/codecrafter/Documents/combined/apps/website/.next "$BUILD_DIR/apps/website/"
cp /home/codecrafter/Documents/combined/apps/website/package.json "$BUILD_DIR/apps/website/"
cp /home/codecrafter/Documents/combined/apps/website/package-lock.json "$BUILD_DIR/apps/website/"

# 2. Copy backend
echo "[2/6] Copying backend..."
mkdir -p "$BUILD_DIR/apps/website/backend"
cp -r /home/codecrafter/Documents/combined/apps/website/backend/* "$BUILD_DIR/apps/website/backend/"

# 3. Copy environment config
echo "[3/6] Copying configuration..."
cp /home/codecrafter/Documents/combined/.env.production "$BUILD_DIR/" 2>/dev/null || true
cp /home/codecrafter/Documents/combined/.env.shared "$BUILD_DIR/" 2>/dev/null || true

# 4. Copy systemd services
echo "[4/6] Copying systemd services..."
mkdir -p "$BUILD_DIR/systemd"
cp /home/codecrafter/Documents/combined/production/systemd/*.service "$BUILD_DIR/systemd/"

# 5. Copy nginx config
echo "[5/6] Copying nginx configuration..."
cp /home/codecrafter/Documents/combined/deploy/nginx.conf "$BUILD_DIR/"

# 6. Create install script
echo "[6/6] Creating install script..."
cat > "$BUILD_DIR/install.sh" << 'INSTALLER_EOF'
#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${GREEN}[$(date '+%H:%M:%S')] $1${NC}"; }
warn() { echo -e "${YELLOW}[$(date '+%H:%M:%S')] WARNING: $1${NC}"; }
error() { echo -e "${RED}[$(date '+%H:%M:%S')] ERROR: $1${NC}"; exit 1; }

PROJECT_NAME="stephenasatsa"
INSTALL_DIR="/opt/${PROJECT_NAME}"
DOMAIN="${1:-localhost}"

if [[ $EUID -ne 0 ]]; then error "Run as root (sudo)"; fi

echo -e "${BLUE}"
echo "======================================"
echo "  Stephen Asatsa Standalone Deployer "
echo "======================================"
echo -e "${NC}"

log "Installing to ${INSTALL_DIR}..."

# Create directory and copy files
mkdir -p "$INSTALL_DIR"
cp -r apps "$INSTALL_DIR/"
cp .env* "$INSTALL_DIR/" 2>/dev/null || true

# Install Node.js dependencies (production only)
log "Installing production dependencies..."
cd "$INSTALL_DIR/apps/website"
npm install --production --legacy-peer-deps

# Setup backend
log "Setting up backend..."
cd "$INSTALL_DIR/apps/website/backend"
python3 -m venv venv
venv/bin/pip install --upgrade pip
venv/bin/pip install -r requirements.txt

# Set permissions
log "Setting permissions..."
chown -R www-data:www-data "$INSTALL_DIR"
chmod -R 755 "$INSTALL_DIR"
mkdir -p /var/log/${PROJECT_NAME}
chown www-data:www-data /var/log/${PROJECT_NAME}

# Configure nginx
log "Configuring nginx..."
sed "s/DOMAIN/${DOMAIN}/g" nginx.conf > /etc/nginx/sites-available/${PROJECT_NAME}
ln -sf /etc/nginx/sites-available/${PROJECT_NAME} /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Install systemd services
log "Installing systemd services..."
cp systemd/*.service /etc/systemd/system/
sed -i "s|/opt/stephenasatsa|${INSTALL_DIR}|g" /etc/systemd/system/${PROJECT_NAME}-*.service
systemctl daemon-reload

# Enable services
for svc in frontend backend; do
    systemctl enable ${PROJECT_NAME}-${svc}
done

# Start services
log "Starting services..."
systemctl start ${PROJECT_NAME}-backend || warn "Backend failed to start"
sleep 3
systemctl start ${PROJECT_NAME}-frontend || warn "Frontend failed to start"

# SSL (optional)
if [[ "$DOMAIN" != "localhost" ]]; then
    log "Setting up SSL..."
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" 2>/dev/null || warn "SSL setup failed"
fi

# Health check
if curl -s --max-time 5 http://localhost > /dev/null; then
    log "✓ Website is responding"
else
    warn "Website not responding yet (may need more time)"
fi

echo ""
echo -e "${GREEN}=== Deploy Complete ===${NC}"
echo -e "URL: ${BLUE}http://${DOMAIN}${NC}"
echo -e "Admin: ${BLUE}http://${DOMAIN}/admin${NC}"
echo -e "Logs: ${BLUE}journalctl -u ${PROJECT_NAME}-* -f${NC}"
echo ""
log "Done!"
INSTALLER_EOF

chmod +x "$BUILD_DIR/install.sh"

# Create archive
echo "Creating archive..."
cd /tmp
tar -czf "${OUTPUT_DIR}/${PACKAGE_NAME}.tar.gz" "$PACKAGE_NAME"

# Create symlink for latest
cd "$OUTPUT_DIR"
ln -sf "${PACKAGE_NAME}.tar.gz" "${PROJECT_NAME}-latest.tar.gz"

echo ""
echo "✅ Standalone package created:"
echo "   ${OUTPUT_DIR}/${PACKAGE_NAME}.tar.gz"
echo "   ${OUTPUT_DIR}/${PROJECT_NAME}-latest.tar.gz"
echo ""
echo "To deploy on server:"
echo "  1. Copy to server: scp ${OUTPUT_DIR}/${PROJECT_NAME}-latest.tar.gz user@server:/tmp/"
echo "  2. Extract: tar -xzf ${PROJECT_NAME}-latest.tar.gz"
echo "  3. Install: sudo ./${PACKAGE_NAME}/install.sh yourdomain.com"
