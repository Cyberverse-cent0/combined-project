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

detect_project_structure() {
    print_info "Detecting project structure..."
    
    # Reset detection flags
    HAS_NEXTJS=false
    HAS_BACKEND=false
    HAS_STATIC_FILES=false
    PROJECT_TYPE="unknown"
    
    # Check for Next.js application
    if [ -f "$PROJECT_DIR/website/package.json" ] && [ -f "$PROJECT_DIR/website/next.config.ts" ]; then
        HAS_NEXTJS=true
        PROJECT_TYPE="nextjs"
        print_info "Next.js application detected."
    elif [ -f "$PROJECT_DIR/website/package.json" ]; then
        HAS_NEXTJS=true
        PROJECT_TYPE="nodejs"
        print_info "Node.js application detected."
    fi
    
    # Check for backend
    if [ -d "$PROJECT_DIR/website/backend" ] && [ -f "$PROJECT_DIR/website/backend/server.py" ]; then
        HAS_BACKEND=true
        print_info "Python backend detected."
    fi
    
    # Check for static files
    if [ -d "$PROJECT_DIR/website/public" ] || [ -d "$PROJECT_DIR/website/out" ] || [ -f "$PROJECT_DIR/website/index.html" ]; then
        HAS_STATIC_FILES=true
        print_info "Static files detected."
    fi
    
    # Determine overall project type
    if [ "$PROJECT_TYPE" = "unknown" ] && [ "$HAS_STATIC_FILES" = true ]; then
        PROJECT_TYPE="static"
        print_info "Project type: Static site"
    elif [ "$HAS_NEXTJS" = true ]; then
        print_info "Project type: Next.js application"
    else
        print_warning "Unable to determine project type. Will attempt minimal setup."
        PROJECT_TYPE="minimal"
    fi
    
    echo "Project Structure Analysis:"
    echo "  - Next.js: $HAS_NEXTJS"
    echo "  - Backend: $HAS_BACKEND"
    echo "  - Static Files: $HAS_STATIC_FILES"
    echo "  - Project Type: $PROJECT_TYPE"
    echo ""
}

check_dependencies() {
    print_info "Checking dependencies..."
    
    # Check for Node.js (only needed for Next.js or Node.js apps)
    if [ "$HAS_NEXTJS" = true ]; then
        if ! command -v node &> /dev/null; then
            print_error "Node.js is not installed. Please install Node.js 18+ first."
            exit 1
        fi
        
        if ! command -v npm &> /dev/null; then
            print_error "npm is not installed. Please install npm first."
            exit 1
        fi
    fi
    
    # Check for Python 3 (only needed for backend)
    if [ "$HAS_BACKEND" = true ]; then
        if ! command -v python3 &> /dev/null; then
            print_error "Python 3 is not installed. Please install Python 3.8+ first."
            exit 1
        fi
        
        if ! command -v pip3 &> /dev/null; then
            print_error "pip3 is not installed. Please install pip3 first."
            exit 1
        fi
    fi
    
    # Check for nginx or python3 for static serving
    if [ "$PROJECT_TYPE" = "static" ]; then
        if ! command -v nginx &> /dev/null && ! command -v python3 &> /dev/null; then
            print_error "Neither nginx nor python3 is available for serving static files."
            exit 1
        fi
    fi
    
    print_info "Required dependencies are installed."
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
    if [ ! -f "$PROJECT_DIR/website/package.json" ]; then
        print_warning "package.json not found in website directory. Skipping Node.js dependencies installation."
        return 0
    fi
    
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
    print_info "Installing systemd services for $PROJECT_TYPE..."
    
    # Install services based on project type
    case "$PROJECT_TYPE" in
        "nextjs"|"nodejs")
            # Next.js or Node.js application
            cp "$PROJECT_DIR/website-systemd-frontend.service" "$SYSTEMD_DIR/website-frontend.service"
            systemctl enable website-frontend.service
            
            if [ "$HAS_BACKEND" = true ]; then
                cp "$PROJECT_DIR/website-systemd-backend.service" "$SYSTEMD_DIR/website-backend.service"
                systemctl enable website-backend.service
            fi
            ;;
        "static")
            # Static files
            cp "$PROJECT_DIR/website-systemd-static.service" "$SYSTEMD_DIR/website-static.service"
            systemctl enable website-static.service
            ;;
        "minimal")
            # Minimal setup - create basic static site
            if [ "$HAS_STATIC_FILES" = true ]; then
                cp "$PROJECT_DIR/website-systemd-static.service" "$SYSTEMD_DIR/website-static.service"
                systemctl enable website-static.service
            else
                print_warning "No static files found. Creating basic index.html..."
                # Create basic index.html if it doesn't exist
                if [ ! -f "$PROJECT_DIR/website/index.html" ]; then
                    print_info "Creating basic static index.html..."
                    # The index.html should already be created by the script
                fi
                cp "$PROJECT_DIR/website-systemd-static.service" "$SYSTEMD_DIR/website-static.service"
                systemctl enable website-static.service
            fi
            ;;
        *)
            print_error "Unknown project type: $PROJECT_TYPE"
            exit 1
            ;;
    esac
    
    # Reload systemd
    systemctl daemon-reload
    
    print_info "Systemd services installed and enabled."
}

start_services() {
    print_info "Starting services for $PROJECT_TYPE..."
    
    # Start services based on project type
    case "$PROJECT_TYPE" in
        "nextjs"|"nodejs")
            # Start backend first if it exists
            if [ "$HAS_BACKEND" = true ]; then
                systemctl start website-backend.service
                sleep 3
            fi
            # Start frontend
            systemctl start website-frontend.service
            ;;
        "static"|"minimal")
            # Start static file server
            systemctl start website-static.service
            ;;
        *)
            print_error "Cannot start services for unknown project type: $PROJECT_TYPE"
            exit 1
            ;;
    esac
    
    print_info "Services started."
}

check_services() {
    print_info "Checking service status..."
    
    echo ""
    case "$PROJECT_TYPE" in
        "nextjs"|"nodejs")
            if [ "$HAS_BACKEND" = true ]; then
                echo "Backend Service Status:"
                systemctl status website-backend.service --no-pager || true
                echo ""
            fi
            echo "Frontend Service Status:"
            systemctl status website-frontend.service --no-pager || true
            ;;
        "static"|"minimal")
            echo "Static File Server Status:"
            systemctl status website-static.service --no-pager || true
            ;;
        *)
            print_error "Cannot check services for unknown project type: $PROJECT_TYPE"
            return 1
            ;;
    esac
    
    echo ""
    print_info "To view logs, use:"
    case "$PROJECT_TYPE" in
        "nextjs"|"nodejs")
            if [ "$HAS_BACKEND" = true ]; then
                echo "  sudo journalctl -u website-backend.service -f"
            fi
            echo "  sudo journalctl -u website-frontend.service -f"
            echo ""
            echo "Or check log files:"
            if [ "$HAS_BACKEND" = true ]; then
                echo "  tail -f $LOGS_DIR/backend.log"
            fi
            echo "  tail -f $LOGS_DIR/frontend.log"
            ;;
        "static"|"minimal")
            echo "  sudo journalctl -u website-static.service -f"
            echo ""
            echo "Or check log files:"
            echo "  tail -f $LOGS_DIR/static.log"
            ;;
    esac
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
    detect_project_structure
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
    case "$PROJECT_TYPE" in
        "nextjs"|"nodejs")
            if [ "$HAS_BACKEND" = true ]; then
                echo "  sudo systemctl start website-backend.service    # Start backend"
                echo "  sudo systemctl stop website-backend.service     # Stop backend"
                echo "  sudo systemctl restart website-backend.service  # Restart backend"
                echo "  sudo systemctl status website-backend.service  # Check status"
                echo ""
            fi
            echo "  sudo systemctl start website-frontend.service   # Start frontend"
            echo "  sudo systemctl stop website-frontend.service    # Stop frontend"
            echo "  sudo systemctl restart website-frontend.service # Restart frontend"
            echo "  sudo systemctl status website-frontend.service # Check status"
            echo ""
            echo "Website will be available at:"
            echo "  Frontend: http://localhost:$FRONTEND_PORT"
            if [ "$HAS_BACKEND" = true ]; then
                echo "  Backend:  http://localhost:$BACKEND_PORT"
            fi
            ;;
        "static"|"minimal")
            echo "  sudo systemctl start website-static.service     # Start static server"
            echo "  sudo systemctl stop website-static.service      # Stop static server"
            echo "  sudo systemctl restart website-static.service   # Restart static server"
            echo "  sudo systemctl status website-static.service   # Check status"
            echo ""
            echo "Website will be available at:"
            echo "  http://localhost:$FRONTEND_PORT"
            ;;
    esac
    echo ""
}

# Run main function
main "$@"
