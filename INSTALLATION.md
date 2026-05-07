# Stephen Asatsa Website - Installation Guide

This guide provides comprehensive instructions for installing the Stephen Asatsa website on a brand new server.

## Quick Start (One-Click Installation)

For automated installation on a fresh server:

```bash
# Download and run the installation script
curl -fsSL https://raw.githubusercontent.com/Cyberverse-cent0/combined-project/main/install.sh | sudo bash

# Or clone and run manually
git clone https://github.com/Cyberverse-cent0/combined-project.git
cd combined-project
sudo ./install.sh
```

## System Requirements

### Minimum Requirements
- **RAM**: 2GB (4GB recommended)
- **CPU**: 2 cores (4 cores recommended)
- **Storage**: 20GB SSD (50GB recommended)
- **OS**: Ubuntu 20.04+, Debian 11+, CentOS 8+, Arch Linux

### Recommended Requirements
- **RAM**: 4GB+
- **CPU**: 4+ cores
- **Storage**: 50GB+ SSD
- **Network**: Stable internet connection

## Supported Operating Systems

- **Ubuntu**: 20.04 LTS, 22.04 LTS, 24.04 LTS
- **Debian**: 11, 12
- **CentOS**: 8, 9
- **Arch Linux**: Latest rolling release

## Manual Installation Steps

### 1. Prepare Server

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
# sudo yum update -y                    # CentOS
# sudo pacman -Syu                      # Arch

# Create system user
sudo useradd -r -s /bin/false www-data
```

### 2. Install Dependencies

#### Ubuntu/Debian
```bash
sudo apt install -y curl wget git nginx postgresql postgresql-contrib \
    build-essential python3 python3-pip python3-venv \
    nodejs npm certbot python3-certbot-nginx \
    ufw fail2ban
```

#### CentOS/RHEL
```bash
sudo yum install -y curl wget git nginx postgresql-server postgresql-contrib \
    gcc python3 python3-pip \
    nodejs npm certbot python3-certbot-nginx \
    firewalld fail2ban
```

#### Arch Linux
```bash
sudo pacman -Sy --noconfirm curl wget git nginx postgresql \
    base-devel python python-pip \
    nodejs npm certbot certbot-nginx \
    ufw fail2ban
```

### 3. Install Node.js 18 LTS

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs npm

# Arch Linux
sudo pacman -S nodejs npm
```

### 4. Install Go

```bash
cd /tmp
wget -q https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.6.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
```

### 5. Setup Database

```bash
# Ubuntu/Debian
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE stephenasatsa_prod;"
sudo -u postgres psql -c "CREATE USER stephenasatsa WITH PASSWORD 'your_secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE stephenasatsa_prod TO stephenasatsa;"
sudo -u postgres psql -c "ALTER USER stephenasatsa CREATEDB;"

# CentOS/RHEL
sudo postgresql-setup --initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
# Then run the same SQL commands as above

# Arch Linux
sudo systemctl enable postgresql
sudo -u postgres initdb -D /var/lib/postgres/data
sudo systemctl start postgresql
# Then run the same SQL commands as above
```

### 6. Clone and Setup Project

```bash
# Create project directory
sudo mkdir -p /opt/stephenasatsa
cd /opt/stephenasatsa

# Clone repository
sudo git clone https://github.com/Cyberverse-cent0/combined-project.git .

# Set permissions
sudo chown -R www-data:www-data /opt/stephenasatsa
sudo chmod -R 755 /opt/stephenasatsa

# Create logs directory
sudo mkdir -p /var/log/stephenasatsa
sudo chown www-data:www-data /var/log/stephenasatsa
```

### 7. Install Frontend Dependencies

```bash
cd /opt/stephenasatsa/apps/website

# Install dependencies
sudo -u www-data npm install

# Generate Prisma client
sudo -u www-data npx prisma generate

# Build for production
sudo -u www-data npm run build
```

### 8. Install Backend Dependencies

```bash
cd /opt/stephenasatsa/apps/website/backend

# Create Python virtual environment
sudo -u www-data python3 -m venv venv
sudo -u www-data venv/bin/pip install --upgrade pip
sudo -u www-data venv/bin/pip install -r requirements.txt
```

### 9. Build Go Services

```bash
cd /opt/stephenasatsa/apps/website/backend/go-services

# Build each Go service
for service in password-service telemetry-service image-service worker-service; do
    cd $service
    sudo -u www-data go build -o $service .
    cd ..
done
```

### 10. Create Environment File

```bash
sudo tee /opt/stephenasatsa/.env.production > /dev/null << EOF
# Production Environment Configuration
WEBSITE_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# CORS Configuration
CORS_ORIGIN=https://your-domain.com
ADMIN_ALLOWED_ORIGIN=https://your-domain.com

# API Configuration
NEXT_PUBLIC_API_URL=""
ADMIN_BACKEND_URL=https://your-domain.com

# Admin Configuration
ADMIN_PASSWORD=ChangeMeToSecurePassword123!

# Database Configuration
DATABASE_URL="postgresql://stephenasatsa:your_secure_password@localhost:5432/stephenasatsa_prod?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Backend Configuration
ADMIN_API_PORT=8001
ADMIN_SESSION_HOURS=8
ADMIN_ALLOWED_ORIGIN=https://your-domain.com

# Go Services Configuration
USE_GO_TELEMETRY_SERVICE=true
GO_TELEMETRY_SERVICE_URL=http://localhost:9002

# Logging
LOG_LEVEL=info
ENABLE_ACCESS_LOGS=true
EOF

sudo chmod 600 /opt/stephenasatsa/.env.production
sudo chown www-data:www-data /opt/stephenasatsa/.env.production
```

### 11. Install Systemd Services

```bash
# Copy service files
sudo cp /opt/stephenasatsa/production/systemd/*.service /etc/systemd/system/

# Reload systemd
sudo systemctl daemon-reload

# Enable services
for service in stephenasatsa-frontend stephenasatsa-backend stephenasatsa-go-password stephenasatsa-go-telemetry stephenasatsa-go-image stephenasatsa-go-worker; do
    sudo systemctl enable $service
done
```

### 12. Configure Nginx

```bash
# Backup original config
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Copy production config
sudo cp /opt/stephenasatsa/production/nginx/nginx.conf /etc/nginx/nginx.conf

# Update domain (replace your-domain.com with your actual domain)
sudo sed -i 's/your-domain.com/your-actual-domain.com/g' /etc/nginx/nginx.conf

# Test configuration
sudo nginx -t

# Enable and start nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 13. Setup SSL Certificate

```bash
# Get SSL certificate from Let's Encrypt (replace with your domain and email)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com --non-interactive --agree-tos --email admin@your-domain.com --redirect

# Setup auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

### 14. Configure Firewall

```bash
# Ubuntu/Debian
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Arch Linux
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

### 15. Start Services

```bash
# Start backend services first
sudo systemctl start stephenasatsa-backend
sudo systemctl start stephenasatsa-go-password
sudo systemctl start stephenasatsa-go-telemetry
sudo systemctl start stephenasatsa-go-image
sudo systemctl start stephenasatsa-go-worker

# Wait a moment for services to start
sleep 5

# Start frontend
sudo systemctl start stephenasatsa-frontend
```

## Post-Installation Configuration

### 1. Update DNS
Point your domain's A record to your server's IP address.

### 2. Update Environment Variables
Edit `/opt/stephenasatsa/.env.production` and update:
- `DOMAIN` to your actual domain
- `ADMIN_PASSWORD` to a secure password
- `DATABASE_URL` if using different database credentials

### 3. Configure OAuth (Optional)
Add Google OAuth credentials if needed:
```bash
# Edit environment file
sudo nano /opt/stephenasatsa/.env.production

# Add these lines:
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Configure Cloudinary (Optional)
For image uploads, add Cloudinary credentials:
```bash
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Service Management

### Check Service Status
```bash
# Check all services
sudo systemctl status stephenasatsa-*

# Check specific service
sudo systemctl status stephenasatsa-frontend
```

### View Logs
```bash
# View service logs
sudo journalctl -u stephenasatsa-frontend -f
sudo journalctl -u stephenasatsa-backend -f

# View application logs
sudo tail -f /var/log/stephenasatsa/frontend.log
sudo tail -f /var/log/stephenasatsa/backend.log
```

### Restart Services
```bash
# Restart all services
sudo systemctl restart stephenasatsa-*

# Restart specific service
sudo systemctl restart stephenasatsa-frontend
```

### Update Application
```bash
cd /opt/stephenasatsa
sudo git pull origin main

# Update frontend
cd apps/website
sudo -u www-data npm install
sudo -u www-data npm run build

# Update backend
cd backend
sudo -u www-data venv/bin/pip install -r requirements.txt

# Rebuild Go services
cd go-services
for service in password-service telemetry-service image-service worker-service; do
    cd $service
    sudo -u www-data go build -o $service .
    cd ..
done

# Restart services
sudo systemctl restart stephenasatsa-*
```

## Troubleshooting

### Common Issues

#### 1. Services Not Starting
```bash
# Check service logs for errors
sudo journalctl -u stephenasatsa-frontend -n 50

# Check if ports are in use
sudo ss -tlnp | grep :3000
sudo ss -tlnp | grep :8001
```

#### 2. Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
sudo -u postgres psql -c "SELECT version();"
```

#### 3. Nginx Configuration Issues
```bash
# Test nginx configuration
sudo nginx -t

# Check nginx logs
sudo journalctl -u nginx -f
```

#### 4. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew
```

### Health Check Commands

```bash
# Check if frontend is responding
curl -I http://localhost:3000

# Check if backend API is responding
curl -I http://localhost:8001/health

# Check nginx configuration
sudo nginx -t

# Check all services
sudo systemctl is-active stephenasatsa-*
```

## Security Recommendations

1. **Change Default Passwords**: Update admin password immediately
2. **Regular Updates**: Keep system packages updated
3. **Firewall**: Ensure only necessary ports are open
4. **Backups**: Set up regular database and file backups
5. **Monitoring**: Set up monitoring and alerting
6. **SSL**: Ensure SSL certificates are always valid

## Backup Strategy

### Database Backup
```bash
# Create backup script
sudo tee /opt/stephenasatsa/backup-db.sh > /dev/null << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/stephenasatsa"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -h localhost -U stephenasatsa stephenasatsa_prod > $BACKUP_DIR/db_backup_$DATE.sql
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete
EOF

sudo chmod +x /opt/stephenasatsa/backup-db.sh

# Add to cron (daily at 2 AM)
echo "0 2 * * * /opt/stephenasatsa/backup-db.sh" | sudo crontab -
```

### File Backup
```bash
# Create file backup script
sudo tee /opt/stephenasatsa/backup-files.sh > /dev/null << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/stephenasatsa"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /opt/stephenasatsa/apps/website/public/uploads

# Keep only last 7 days
find $BACKUP_DIR -name "files_backup_*.tar.gz" -mtime +7 -delete
EOF

sudo chmod +x /opt/stephenasatsa/backup-files.sh

# Add to cron (weekly on Sunday at 3 AM)
echo "0 3 * * 0 /opt/stephenasatsa/backup-files.sh" | sudo crontab -
```

## Support

For support and issues:
1. Check the troubleshooting section above
2. Review service logs for error messages
3. Verify all configuration files
4. Check system resource usage
5. Test individual components separately

## License

This project is licensed under the MIT License. See LICENSE file for details.
