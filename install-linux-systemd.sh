#!/bin/bash

# Stephen Asatsa Website - Linux Systemd Installation Script
# This script installs and configures the website as systemd services on Linux

set -e

# Configuration
PROJECT_DIR="/home/codecrafter/combined-project"
SERVICE_USER="codecrafter"
FRONTEND_PORT=3000
BACKEND_PORT=8000
SYSTEMD_DIR="/etc/systemd/system"
LOGS_DIR="$PROJECT_DIR/logs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
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

check_dependencies() {
    print_info "Checking dependencies..."
    
    # Check for Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check for npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check for Python 3
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.8+ first."
        exit 1
    fi
    
    # Check for pip3
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is not installed. Please install pip3 first."
        exit 1
    fi
    
    print_info "All dependencies are installed."
}

setup_directories() {
    print_info "Setting up directories..."
    
    # Create logs directory
    mkdir -p "$LOGS_DIR"
    chown $SERVICE_USER:$SERVICE_USER "$LOGS_DIR"
    
    print_info "Directories created."
}

install_python_dependencies() {
    if [ ! -d "$PROJECT_DIR/website/backend" ]; then
        print_warning "Backend directory not found. Skipping Python backend installation."
        return 0
    fi
    
    print_info "Installing Python dependencies..."
    
    cd "$PROJECT_DIR/website/backend"
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_info "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment and install dependencies
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt || {
        print_warning "requirements.txt not found, installing basic dependencies..."
        pip install flask gunicorn
    }
    deactivate
    
    print_info "Python dependencies installed."
}

install_node_dependencies() {
    print_info "Installing Node.js dependencies..."
    
    cd "$PROJECT_DIR/website"
    
    # Install dependencies
    npm install
    
    # Build Next.js app
    npm run build || {
        print_warning "Build failed, continuing anyway..."
    }
    
    print_info "Node.js dependencies installed."
}

setup_environment_files() {
    print_info "Setting up environment files..."
    
    # Backend .env
    if [ -d "$PROJECT_DIR/website/backend" ] && [ ! -f "$PROJECT_DIR/website/backend/.env" ]; then
        print_info "Creating backend .env file..."
        cat > "$PROJECT_DIR/website/backend/.env" << EOF
# Backend Configuration
ADMIN_API_PORT=$BACKEND_PORT
ADMIN_ALLOWED_ORIGIN=*
PYTHONUNBUFFERED=1
EOF
    fi
    
    # Frontend .env
    if [ ! -f "$PROJECT_DIR/website/.env" ]; then
        print_info "Creating frontend .env file..."
        cat > "$PROJECT_DIR/website/.env" << EOF
# Frontend Configuration
NODE_ENV=production
PORT=$FRONTEND_PORT
NEXT_PUBLIC_API_URL=http://localhost:$BACKEND_PORT
EOF
    fi
    
    print_info "Environment files configured."
}

install_systemd_services() {
    print_info "Installing systemd services..."
    
    # Copy frontend service file
    cp "$PROJECT_DIR/website-systemd-frontend.service" "$SYSTEMD_DIR/website-frontend.service"
    
    # Copy backend service file only if backend directory exists
    if [ -d "$PROJECT_DIR/website/backend" ]; then
        cp "$PROJECT_DIR/website-systemd-backend.service" "$SYSTEMD_DIR/website-backend.service"
        systemctl enable website-backend.service
    else
        print_warning "Backend directory not found. Skipping backend service installation."
    fi
    
    # Reload systemd
    systemctl daemon-reload
    
    # Enable frontend service
    systemctl enable website-frontend.service
    
    print_info "Systemd services installed and enabled."
}

start_services() {
    print_info "Starting services..."
    
    # Start backend first if it exists
    if [ -d "$PROJECT_DIR/website/backend" ]; then
        systemctl start website-backend.service
        sleep 3
    fi
    
    # Start frontend
    systemctl start website-frontend.service
    
    print_info "Services started."
}

check_services() {
    print_info "Checking service status..."
    
    echo ""
    if [ -d "$PROJECT_DIR/website/backend" ]; then
        echo "Backend Service Status:"
        systemctl status website-backend.service --no-pager || true
    else
        echo "Backend Service: Not installed (backend directory not found)"
    fi
    
    echo ""
    echo "Frontend Service Status:"
    systemctl status website-frontend.service --no-pager || true
    
    echo ""
    print_info "To view logs, use:"
    if [ -d "$PROJECT_DIR/website/backend" ]; then
        echo "  sudo journalctl -u website-backend.service -f"
    fi
    echo "  sudo journalctl -u website-frontend.service -f"
    echo ""
    echo "Or check log files:"
    if [ -d "$PROJECT_DIR/website/backend" ]; then
        echo "  tail -f $LOGS_DIR/backend.log"
    fi
    echo "  tail -f $LOGS_DIR/frontend.log"
}

setup_nginx() {
    print_warning "Nginx setup is optional. Would you like to configure Nginx now? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_info "Setting up Nginx..."
        
        # Check if nginx is installed
        if ! command -v nginx &> /dev/null; then
            print_info "Installing Nginx..."
            apt update
            apt install -y nginx
        fi
        
        # Copy nginx config
        if [ -f "$PROJECT_DIR/nginx-port80.conf" ]; then
            cp "$PROJECT_DIR/nginx-port80.conf" /etc/nginx/sites-available/stephenasatsa
            ln -sf /etc/nginx/sites-available/stephenasatsa /etc/nginx/sites-enabled/
            rm -f /etc/nginx/sites-enabled/default
            nginx -t && systemctl reload nginx
            print_info "Nginx configured."
        else
            print_warning "Nginx config file not found at $PROJECT_DIR/nginx-port80.conf"
        fi
    fi
}

main() {
    print_info "Starting installation of Stephen Asatsa Website..."
    echo ""
    
    check_root
    check_dependencies
    setup_directories
    install_python_dependencies
    install_node_dependencies
    setup_environment_files
    install_systemd_services
    start_services
    check_services
    setup_nginx
    
    echo ""
    print_info "Installation completed successfully!"
    echo ""
    echo "Service Management Commands:"
    echo "  sudo systemctl start website-backend.service    # Start backend"
    echo "  sudo systemctl stop website-backend.service     # Stop backend"
    echo "  sudo systemctl restart website-backend.service  # Restart backend"
    echo "  sudo systemctl status website-backend.service  # Check status"
    echo ""
    echo "  sudo systemctl start website-frontend.service   # Start frontend"
    echo "  sudo systemctl stop website-frontend.service    # Stop frontend"
    echo "  sudo systemctl restart website-frontend.service # Restart frontend"
    echo "  sudo systemctl status website-frontend.service # Check status"
    echo ""
    echo "Website will be available at:"
    echo "  Frontend: http://localhost:$FRONTEND_PORT"
    echo "  Backend:  http://localhost:$BACKEND_PORT"
    echo ""
}

# Run main function
main "$@"
