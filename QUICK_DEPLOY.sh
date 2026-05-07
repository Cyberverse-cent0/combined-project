#!/bin/bash

# Quick Deployment Script for Stephen Asatsa Website
# This script handles deployment to a new server with background process management

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="${DOMAIN:-}"
APP_DIR="/opt/stephenasatsa"
SERVICE_USER="www-data"

print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  Stephen Asatsa Website Deployment${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_error "This script must be run as root or with sudo"
        exit 1
    fi
}

get_domain() {
    if [ -z "$DOMAIN" ]; then
        echo -e "${YELLOW}Please enter your domain name:${NC}"
        read -r DOMAIN
        if [ -z "$DOMAIN" ]; then
            print_error "Domain name is required"
            exit 1
        fi
    fi
}

install_dependencies() {
    print_info "Installing system dependencies..."
    
    # Update package list
    apt-get update
    
    # Install basic dependencies
    apt-get install -y curl wget git nginx postgresql python3 python3-pip python3-venv build-essential ufw certbot python3-certbot-nginx
    
    # Install Node.js 18 LTS
    if ! command -v node &> /dev/null; then
        print_info "Installing Node.js 18 LTS..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    else
        print_info "Node.js is already installed"
    fi
    
    print_info "Dependencies installed successfully"
}

setup_database() {
    print_info "Setting up PostgreSQL database..."
    
    # Start PostgreSQL
    systemctl start postgresql
    systemctl enable postgresql
    
    # Create database and user
    sudo -u postgres createdb stephenasatsa_prod || print_warning "Database may already exist"
    
    # Generate secure password
    DB_PASSWORD=$(openssl rand -base64 32)
    
    # Create database user
    sudo -u postgres psql -c "CREATE USER stephenasatsa WITH PASSWORD '$DB_PASSWORD';" || print_warning "User may already exist"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE stephenasatsa_prod TO stephenasatsa;"
    sudo -u postgres psql -c "ALTER USER stephenasatsa PASSWORD '$DB_PASSWORD';"
    
    print_info "Database setup completed"
    echo "DB_PASSWORD: $DB_PASSWORD"
}

clone_project() {
    print_info "Cloning project repository..."
    
    # Create app directory
    mkdir -p "$APP_DIR"
    
    # Clone repository
    if [ ! -d "$APP_DIR/.git" ]; then
        git clone https://github.com/Cyberverse-cent0/combined-project.git "$APP_DIR"
    else
        print_info "Repository already exists, pulling latest changes..."
        cd "$APP_DIR"
        git pull origin main
    fi
    
    # Set ownership
    chown -R "$SERVICE_USER:$SERVICE_USER" "$APP_DIR"
    chmod -R 755 "$APP_DIR"
    
    print_info "Project cloned to $APP_DIR"
}

setup_application() {
    print_info "Setting up application..."
    
    cd "$APP_DIR/apps/website"
    
    # Install Node.js dependencies
    print_info "Installing Node.js dependencies..."
    sudo -u "$SERVICE_USER" npm install
    
    # Setup Python backend
    print_info "Setting up Python backend..."
    cd backend
    sudo -u "$SERVICE_USER" python3 -m venv venv
    sudo -u "$SERVICE_USER" venv/bin/pip install -r requirements.txt
    cd ..
    
    # Generate Prisma client
    print_info "Generating Prisma client..."
    sudo -u "$SERVICE_USER" npx prisma generate
    
    # Build application
    print_info "Building Next.js application..."
    sudo -u "$SERVICE_USER" npm run build
    
    print_info "Application setup completed"
}

create_environment_file() {
    print_info "Creating environment configuration..."
    
    # Generate secrets
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    ADMIN_PASSWORD=$(openssl rand -base64 16)
    
    # Create .env.production file
    cat > "$APP_DIR/.env.production" << EOF
# Production Environment Configuration
NODE_ENV=production
WEBSITE_URL=https://$DOMAIN
NEXTAUTH_URL=https://$DOMAIN
NEXT_PUBLIC_SITE_URL=https://$DOMAIN

# Database Configuration
DATABASE_URL="postgresql://stephenasatsa:$DB_PASSWORD@localhost:5432/stephenasatsa_prod"

# Security
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
ADMIN_PASSWORD="$ADMIN_PASSWORD"

# API Configuration
ADMIN_BACKEND_URL=https://$DOMAIN
ADMIN_API_PORT=8001
EOF
    
    chown "$SERVICE_USER:$SERVICE_USER" "$APP_DIR/.env.production"
    chmod 600 "$APP_DIR/.env.production"
    
    print_info "Environment configuration created"
    print_warning "Save these credentials securely:"
    echo "NEXTAUTH_SECRET: $NEXTAUTH_SECRET"
    echo "ADMIN_PASSWORD: $ADMIN_PASSWORD"
    echo "Database Password: $DB_PASSWORD"
}

setup_systemd_services() {
    print_info "Setting up systemd services..."
    
    # Create backend service
    cat > /etc/systemd/system/stephenasatsa-backend.service << EOF
[Unit]
Description=Stephen Asatsa Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=$SERVICE_USER
WorkingDirectory=$APP_DIR/apps/website/backend
Environment=NODE_ENV=production
Environment=PYTHONUNBUFFERED=1
Environment=ADMIN_API_PORT=8001
Environment=DATABASE_URL="postgresql://stephenasatsa:$DB_PASSWORD@localhost:5432/stephenasatsa_prod"
ExecStart=$APP_DIR/apps/website/backend/venv/bin/python server.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
    
    # Create frontend service
    cat > /etc/systemd/system/stephenasatsa-frontend.service << EOF
[Unit]
Description=Stephen Asatsa Frontend Service
After=network.target

[Service]
Type=simple
User=$SERVICE_USER
WorkingDirectory=$APP_DIR/apps/website
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
    
    # Reload systemd
    systemctl daemon-reload
    
    # Enable services
    systemctl enable stephenasatsa-backend.service
    systemctl enable stephenasatsa-frontend.service
    
    print_info "Systemd services configured"
}

setup_ginx() {
    print_info "Setting up Nginx configuration..."
    
    # Create Nginx configuration
    cat > /etc/nginx/sites-available/stephenasatsa << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL certificates (will be added by certbot)
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Frontend proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:8001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    # Enable site
    ln -sf /etc/nginx/sites-available/stephenasatsa /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    nginx -t
    
    print_info "Nginx configuration completed"
}

setup_ssl() {
    print_info "Setting up SSL certificates..."
    
    # Get SSL certificate
    certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email admin@"$DOMAIN"
    
    # Test auto-renewal
    certbot renew --dry-run
    
    print_info "SSL certificates installed"
}

setup_firewall() {
    print_info "Configuring firewall..."
    
    # Configure UFW
    ufw --force reset
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    
    print_info "Firewall configured"
}

start_services() {
    print_info "Starting services..."
    
    # Start backend service
    systemctl start stephenasatsa-backend.service
    sleep 3
    
    # Start frontend service
    systemctl start stephenasatsa-frontend.service
    sleep 3
    
    # Restart nginx
    systemctl restart nginx
    
    print_info "Services started successfully"
}

display_status() {
    print_info "Deployment completed successfully!"
    echo ""
    echo -e "${GREEN}Website is now running at: https://$DOMAIN${NC}"
    echo ""
    echo "Service Status:"
    systemctl status stephenasatsa-backend.service --no-pager --lines=3
    systemctl status stephenasatsa-frontend.service --no-pager --lines=3
    systemctl status nginx --no-pager --lines=3
    echo ""
    echo "Useful Commands:"
    echo "  View logs: sudo journalctl -u stephenasatsa-backend -f"
    echo "  View logs: sudo journalctl -u stephenasatsa-frontend -f"
    echo "  Restart: sudo systemctl restart stephenasatsa-backend stephenasatsa-frontend"
    echo "  Stop: sudo systemctl stop stephenasatsa-backend stephenasatsa-frontend"
    echo ""
    print_warning "Save the credentials shown above securely!"
}

main() {
    print_header
    check_root
    get_domain
    install_dependencies
    setup_database
    clone_project
    setup_application
    create_environment_file
    setup_systemd_services
    setup_nginx
    setup_ssl
    setup_firewall
    start_services
    display_status
}

# Run main function
main "$@"
