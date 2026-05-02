# Linux Systemd Installation Guide

This guide explains how to install and run the Stephen Asatsa website on a Linux server using systemd services.

## Prerequisites

### System Requirements
- **OS**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+ / RHEL 8+
- **RAM**: Minimum 2GB, Recommended 4GB+
- **CPU**: Minimum 2 cores, Recommended 4+ cores
- **Disk**: Minimum 10GB free space

### Software Requirements
- **Node.js**: v18 or higher
- **Python**: v3.8 or higher
- **npm**: v9 or higher
- **pip3**: Latest version
- **git**: For cloning the repository (if needed)

## Quick Installation

### Automated Installation

Run the automated installation script:

```bash
cd /home/codecrafter/combined
sudo ./install-linux-systemd.sh
```

The script will:
1. Check for required dependencies
2. Set up necessary directories
3. Install Python dependencies in a virtual environment
4. Install Node.js dependencies
5. Configure environment files
6. Install and enable systemd services
7. Start the services
8. Optionally configure Nginx

## Manual Installation

### Step 1: Install System Dependencies

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y nodejs npm python3 python3-pip python3-venv git
```

**CentOS/RHEL:**
```bash
sudo dnf install -y nodejs npm python3 python3-pip git
```

### Step 2: Clone or Navigate to Project

```bash
cd /home/codecrafter/combined
```

### Step 3: Set Up Directories

```bash
sudo mkdir -p /home/codecrafter/combined/logs
sudo chown codecrafter:codecrafter /home/codecrafter/combined/logs
```

### Step 4: Install Python Backend Dependencies

```bash
cd /home/codecrafter/combined/website/backend

# Create virtual environment
python3 -m venv venv

# Activate and install dependencies
source venv/bin/activate
pip install --upgrade pip
pip install flask gunicorn
# Add any other dependencies from requirements.txt if it exists
deactivate
```

### Step 5: Install Node.js Frontend Dependencies

```bash
cd /home/codecrafter/combined/website

# Install dependencies
npm install

# Build the application
npm run build
```

### Step 6: Configure Environment Files

**Backend (.env):**
```bash
cd /home/codecrafter/combined/website/backend
cat > .env << EOF
ADMIN_API_PORT=8000
ADMIN_ALLOWED_ORIGIN=*
PYTHONUNBUFFERED=1
EOF
```

**Frontend (.env):**
```bash
cd /home/codecrafter/combined/website
cat > .env << EOF
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

### Step 7: Install Systemd Services

```bash
cd /home/codecrafter/combined

# Copy service files
sudo cp website-systemd-frontend.service /etc/systemd/system/website-frontend.service
sudo cp website-systemd-backend.service /etc/systemd/system/website-backend.service

# Reload systemd
sudo systemctl daemon-reload

# Enable services to start on boot
sudo systemctl enable website-backend.service
sudo systemctl enable website-frontend.service
```

### Step 8: Start Services

```bash
# Start backend first
sudo systemctl start website-backend.service

# Wait a few seconds
sleep 3

# Start frontend
sudo systemctl start website-frontend.service
```

### Step 9: Verify Services

```bash
# Check service status
sudo systemctl status website-backend.service
sudo systemctl status website-frontend.service

# Check if ports are listening
sudo ss -tuln | grep -E '3000|8000'
```

## Service Management

### Start/Stop/Restart Services

```bash
# Backend
sudo systemctl start website-backend.service
sudo systemctl stop website-backend.service
sudo systemctl restart website-backend.service

# Frontend
sudo systemctl start website-frontend.service
sudo systemctl stop website-frontend.service
sudo systemctl restart website-frontend.service

# Both at once
sudo systemctl restart website-backend.service website-frontend.service
```

### View Logs

**Using journalctl (systemd logs):**
```bash
# Backend logs
sudo journalctl -u website-backend.service -f

# Frontend logs
sudo journalctl -u website-frontend.service -f

# Last 100 lines
sudo journalctl -u website-backend.service -n 100
```

**Using log files:**
```bash
# Backend logs
tail -f /home/codecrafter/combined/logs/backend.log
tail -f /home/codecrafter/combined/logs/backend-error.log

# Frontend logs
tail -f /home/codecrafter/combined/logs/frontend.log
tail -f /home/codecrafter/combined/logs/frontend-error.log
```

### Enable/Disable Services

```bash
# Enable (start on boot)
sudo systemctl enable website-backend.service
sudo systemctl enable website-frontend.service

# Disable (don't start on boot)
sudo systemctl disable website-backend.service
sudo systemctl disable website-frontend.service
```

## Nginx Configuration (Optional)

### Install Nginx

**Ubuntu/Debian:**
```bash
sudo apt install -y nginx
```

**CentOS/RHEL:**
```bash
sudo dnf install -y nginx
```

### Configure Nginx

Use one of the provided Nginx configurations:

```bash
# For port 80 (HTTP)
sudo cp /home/codecrafter/combined/nginx-port80.conf /etc/nginx/sites-available/stephenasatsa

# For port 8080 (alternative)
sudo cp /home/codecrafter/combined/nginx-port8080.conf /etc/nginx/sites-available/stephenasatsa

# Enable the site
sudo ln -sf /etc/nginx/sites-available/stephenasatsa /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Start Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Firewall Configuration

### Ubuntu/Debian (UFW)

```bash
# Allow HTTP
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow direct access to ports (if not using Nginx)
sudo ufw allow 3000/tcp
sudo ufw allow 8000/tcp

# Enable firewall
sudo ufw enable
```

### CentOS/RHEL (firewalld)

```bash
# Allow HTTP
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Allow direct access to ports (if not using Nginx)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=8000/tcp

# Reload firewall
sudo firewall-cmd --reload
```

## Troubleshooting

### Service Won't Start

1. **Check service status:**
   ```bash
   sudo systemctl status website-backend.service
   sudo systemctl status website-frontend.service
   ```

2. **View logs for errors:**
   ```bash
   sudo journalctl -u website-backend.service -n 50
   sudo journalctl -u website-frontend.service -n 50
   ```

3. **Check if ports are already in use:**
   ```bash
   sudo ss -tuln | grep -E '3000|8000'
   ```

4. **Check file permissions:**
   ```bash
   ls -la /home/codecrafter/combined
   ls -la /home/codecrafter/combined/logs
   ```

### Python Module Not Found

Reinstall Python dependencies:
```bash
cd /home/codecrafter/combined/website/backend
source venv/bin/activate
pip install -r requirements.txt
deactivate
sudo systemctl restart website-backend.service
```

### Node.js Build Fails

Clear cache and rebuild:
```bash
cd /home/codecrafter/combined/website
rm -rf .next node_modules
npm install
npm run build
sudo systemctl restart website-frontend.service
```

### Permission Denied

Ensure correct ownership:
```bash
sudo chown -R codecrafter:codecrafter /home/codecrafter/combined
sudo chmod -R 755 /home/codecrafter/combined
```

## Updating the Application

### Update Code

```bash
cd /home/codecrafter/combined
git pull origin main  # or your branch
```

### Update Dependencies

**Backend:**
```bash
cd /home/codecrafter/combined/website/backend
source venv/bin/activate
pip install -r requirements.txt --upgrade
deactivate
```

**Frontend:**
```bash
cd /home/codecrafter/combined/website
npm install
npm run build
```

### Restart Services

```bash
sudo systemctl restart website-backend.service
sudo systemctl restart website-frontend.service
```

## Uninstallation

### Stop and Disable Services

```bash
sudo systemctl stop website-backend.service website-frontend.service
sudo systemctl disable website-backend.service website-frontend.service
```

### Remove Service Files

```bash
sudo rm /etc/systemd/system/website-backend.service
sudo rm /etc/systemd/system/website-frontend.service
sudo systemctl daemon-reload
```

### Remove Application Files (Optional)

```bash
sudo rm -rf /home/codecrafter/combined
```

## Service Files Reference

### Frontend Service (`website-systemd-frontend.service`)
- **User**: codecrafter
- **Working Directory**: /home/codecrafter/combined/website
- **Port**: 3000
- **Command**: npm start
- **Logs**: /home/codecrafter/combined/logs/frontend.log

### Backend Service (`website-systemd-backend.service`)
- **User**: codecrafter
- **Working Directory**: /home/codecrafter/combined/website/backend
- **Port**: 8000
- **Command**: venv/bin/python server.py
- **Logs**: /home/codecrafter/combined/logs/backend.log

## Alternative: PM2 Installation

If you prefer PM2 over systemd, use the existing PM2 configuration:

```bash
cd /home/codecrafter/combined
./start-pm2.sh
```

See `README-PM2.md` for more details on PM2 setup.

## Support

For issues or questions:
1. Check the logs first
2. Review the troubleshooting section
3. Check service status with `systemctl status`
4. Verify all dependencies are installed correctly
