# Server Deployment Guide - Stephen Asatsa Website

## 🚀 Quick Start

### Option 1: One-Click Automated Deployment (Recommended)

```bash
# On your new server, run this single command:
curl -fsSL https://raw.githubusercontent.com/Cyberverse-cent0/combined-project/main/install.sh | sudo bash
```

### Option 2: Manual Step-by-Step Deployment

Follow the detailed steps below for complete control over the deployment process.

## 📋 Server Requirements

- **OS**: Ubuntu 20.04+, Debian 11+, CentOS 8+, or Arch Linux
- **RAM**: 1GB minimum (2GB recommended)
- **CPU**: 1 core minimum (2 cores recommended)
- **Storage**: 8GB minimum (20GB recommended)
- **Network**: Public IP with ports 80, 443 accessible

## 🔧 Installation Methods

### Method 1: Using the Comprehensive Installation Script

The automated script handles everything:
- System dependencies installation
- Database setup (PostgreSQL)
- Node.js and Python environment
- Application build and configuration
- SSL certificates with Let's Encrypt
- Systemd services for background processes
- Nginx reverse proxy setup
- Security hardening

```bash
# Download and run
curl -fsSL https://raw.githubusercontent.com/Cyberverse-cent0/combined-project/main/install.sh | sudo bash
```

### Method 2: Manual Deployment with Systemd Services

If you prefer manual control:

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y git curl wget nginx postgresql python3 python3-pip python3-venv build-essential

# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Step 2: Clone and Setup Project

```bash
# Clone repository
git clone https://github.com/Cyberverse-cent0/combined-project.git /opt/stephenasatsa
cd /opt/stephenasatsa

# Set ownership
sudo chown -R www-data:www-data /opt/stephenasatsa
sudo chmod -R 755 /opt/stephenasatsa
```

#### Step 3: Database Setup

```bash
# Setup PostgreSQL
sudo -u postgres createdb stephenasatsa_prod
sudo -u postgres createuser --interactive
# Create user with strong password

# Configure database
sudo -u postgres psql -c "ALTER USER stephenasatsa PASSWORD 'your-strong-password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE stephenasatsa_prod TO stephenasatsa;"
```

#### Step 4: Application Setup

```bash
# Navigate to website directory
cd /opt/stephenasatsa/apps/website

# Install Node.js dependencies
sudo -u www-data npm install

# Setup Python backend
cd backend
sudo -u www-data python3 -m venv venv
sudo -u www-data venv/bin/pip install -r requirements.txt
cd ..

# Generate Prisma client
sudo -u www-data npx prisma generate

# Build application
sudo -u www-data npm run build
```

#### Step 5: Environment Configuration

Create `/opt/stephenasatsa/.env.production`:

```env
# Production Environment
NODE_ENV=production
WEBSITE_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Database
DATABASE_URL="postgresql://stephenasatsa:your-password@localhost:5432/stephenasatsa_prod"

# Security
NEXTAUTH_SECRET="your-very-strong-secret-here"
ADMIN_PASSWORD="your-secure-admin-password"

# API Configuration
ADMIN_BACKEND_URL=https://your-domain.com
ADMIN_API_PORT=8001
```

#### Step 6: Systemd Services Setup

Create backend service `/etc/systemd/system/stephenasatsa-backend.service`:

```ini
[Unit]
Description=Stephen Asatsa Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/stephenasatsa/apps/website/backend
Environment=NODE_ENV=production
Environment=PYTHONUNBUFFERED=1
Environment=ADMIN_API_PORT=8001
Environment=DATABASE_URL="postgresql://stephenasatsa:your-password@localhost:5432/stephenasatsa_prod"
ExecStart=/opt/stephenasatsa/apps/website/backend/venv/bin/python server.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Create frontend service `/etc/systemd/system/stephenasatsa-frontend.service`:

```ini
[Unit]
Description=Stephen Asatsa Frontend Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/stephenasatsa/apps/website
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

#### Step 7: Enable and Start Services

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable services
sudo systemctl enable stephenasatsa-backend stephenasatsa-frontend

# Start services
sudo systemctl start stephenasatsa-backend stephenasatsa-frontend

# Check status
sudo systemctl status stephenasatsa-backend stephenasatsa-frontend
```

#### Step 8: Nginx Configuration

Create `/etc/nginx/sites-available/stephenasatsa`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL certificates (will be added by certbot)
    # ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Frontend proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:8001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/stephenasatsa /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 9: SSL Certificate Setup

```bash
# Install certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 🔄 Background Process Management

### Using Systemd (Recommended)

Systemd services automatically restart if they crash and start on boot:

```bash
# Check service status
sudo systemctl status stephenasatsa-backend
sudo systemctl status stephenasatsa-frontend

# View logs
sudo journalctl -u stephenasatsa-backend -f
sudo journalctl -u stephenasatsa-frontend -f

# Restart services
sudo systemctl restart stephenasatsa-backend stephenasatsa-frontend

# Stop services
sudo systemctl stop stephenasatsa-backend stephenasatsa-frontend
```

### Alternative: Using PM2

If you prefer PM2 for process management:

```bash
# Install PM2
sudo npm install -g pm2

# Start services with PM2
cd /opt/stephenasatsa/apps/website
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### Alternative: Using Docker Compose

For containerized deployment:

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📊 Monitoring and Maintenance

### Health Checks

```bash
# Check website
curl -I https://your-domain.com

# Check backend API
curl -I https://your-domain.com/api/health

# Check service status
sudo systemctl status stephenasatsa-*
```

### Log Management

```bash
# View application logs
sudo journalctl -u stephenasatsa-backend --since "1 hour ago"
sudo journalctl -u stephenasatsa-frontend --since "1 hour ago"

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Maintenance

```bash
# Backup database
sudo -u postgres pg_dump stephenasatsa_prod > backup_$(date +%Y%m%d).sql

# Restore database
sudo -u postgres psql stephenasatsa_prod < backup_20241201.sql
```

## 🔒 Security Considerations

- **Firewall**: Only open ports 80, 443, and SSH
- **SSL**: Always use HTTPS with valid certificates
- **Updates**: Keep system and packages updated
- **Backups**: Regular database and file backups
- **Monitoring**: Monitor service status and logs

## 🚨 Troubleshooting

### Services Won't Start

```bash
# Check port conflicts
sudo ss -tuln | grep -E ':(3000|8001)'

# Check permissions
sudo ls -la /opt/stephenasatsa/

# Check logs
sudo journalctl -u stephenasatsa-backend --since "10 minutes ago"
```

### SSL Certificate Issues

```bash
# Test certificate
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check nginx config
sudo nginx -t
```

### Database Connection Issues

```bash
# Test database
sudo -u postgres psql -c "SELECT version();"

# Check PostgreSQL status
sudo systemctl status postgresql
```

## 📞 Support

For deployment issues:
1. Check logs for error messages
2. Verify all prerequisites are met
3. Ensure proper permissions
4. Test each component individually

This guide ensures your Stephen Asatsa website runs reliably in the background with proper process management and monitoring.
