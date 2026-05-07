# Production Deployment Guide

## 🚀 Overview

This guide provides comprehensive instructions for deploying the Stephen Asatsa website on dedicated servers using the automated installation script.

## 📋 Prerequisites

### Server Requirements
- **RAM**: 1GB minimum (2GB recommended, 4GB optimal)
- **CPU**: 1 core minimum (2 cores recommended, 4 cores optimal)
- **Storage**: 8GB minimum (20GB recommended, 50GB optimal)
- **OS**: Ubuntu 20.04+, Debian 11+, CentOS 8+, Arch Linux
- **Network**: Public IP address with ports 80, 443 accessible

### Domain Requirements (Optional but Recommended)
- Domain name pointing to server IP
- DNS A record for main domain
- DNS A record for www subdomain (optional)

## 🔧 Installation Methods

### Method 1: One-Click Installation (Recommended)

```bash
# Download and run installation script
curl -fsSL https://raw.githubusercontent.com/Cyberverse-cent0/combined-project/main/install.sh | sudo bash
```

### Method 2: Manual Installation

```bash
# Clone repository
git clone https://github.com/Cyberverse-cent0/combined-project.git
cd combined-project

# Run installation script
sudo ./install.sh
```

## 📝 Installation Process

### Phase 1: System Detection and Setup
- **OS Detection**: Automatically identifies Ubuntu, Debian, CentOS, or Arch Linux
- **Package Manager**: Configures apt, yum, or pacman accordingly
- **Requirements Check**: Validates RAM, CPU, and disk space
- **User Prompts**: Domain name configuration

### Phase 2: Dependencies Installation
- **System Packages**: curl, wget, git, nginx, postgresql, build-essential
- **Node.js**: Latest LTS version (18.x or 20.x) from NodeSource
- **Python**: 3.8+ with pip and venv
- **Go**: 1.21+ for microservices
- **Security Tools**: certbot, ufw/firewalld, fail2ban

### Phase 3: Database Configuration
- **PostgreSQL**: Installation and service setup
- **Database Creation**: Secure database with random credentials
- **User Setup**: Dedicated database user with proper permissions
- **Security**: Password generation and secure storage

### Phase 4: Project Setup
- **Repository**: Clone or use existing project files
- **Directory Structure**: Creates `/opt/stephenasatsa` with proper permissions
- **Ownership**: Sets www-data as file owner
- **Logs**: Creates logging directories

### Phase 5: Application Build
- **Frontend**: npm install, prisma generate, npm run build
- **Backend**: Python venv setup and pip install requirements
- **Go Services**: Compile all microservices
- **Dependencies**: Verify all packages installed

### Phase 6: Configuration
- **Environment**: Production .env file with secure secrets
- **Database URL**: PostgreSQL connection string
- **API Configuration**: Backend URLs and CORS settings
- **Security**: Random secrets and secure defaults

### Phase 7: System Services
- **Systemd**: Creates service files for all components
- **Dependencies**: Proper service startup order
- **Permissions**: Security-hardened service configuration
- **Logging**: Structured log output to files

### Phase 8: Web Server Setup
- **Nginx**: Production-optimized configuration
- **SSL**: Let's Encrypt certificate installation
- **Proxy**: Reverse proxy configuration for all services
- **Security Headers**: HSTS, CSP, and other security headers

### Phase 9: Security Hardening
- **Firewall**: UFW or firewalld configuration
- **Ports**: Only necessary ports open (80, 443, SSH)
- **Fail2Ban**: Brute force protection
- **SSL**: Auto-renewal setup with cron

### Phase 10: Service Startup
- **Backend Services**: Start Python and Go services
- **Frontend**: Start Next.js production server
- **Health Checks**: Verify all services responding
- **System Status**: Final verification

## 🔍 Post-Installation Verification

### Service Status Check
```bash
# Check all services
systemctl status stephenasatsa-*

# Check specific services
systemctl status nginx
systemctl status postgresql
```

### Health Endpoints
```bash
# Website health
curl -I https://your-domain.com/health

# Backend API health
curl -I https://your-domain.com/api/health

# Go services health
curl -I http://localhost:9001/health  # Password service
curl -I http://localhost:9002/health  # Telemetry service
curl -I http://localhost:9003/health  # Image service
curl -I http://localhost:9004/health  # Worker service
```

### Log Verification
```bash
# Installation log
tail -f /var/log/stephenasatsa_install.log

# Service logs
journalctl -u stephenasatsa-frontend -f
journalctl -u stephenasatsa-backend -f
journalctl -u nginx -f
```

## 🛠️ Configuration Management

### Environment Variables
File: `/opt/stephenasatsa/.env.production`

```env
# Production Environment Configuration
WEBSITE_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/stephenasatsa_prod"

# Security
NEXTAUTH_SECRET="your-secret-here"
ADMIN_PASSWORD="your-admin-password"

# API Configuration
ADMIN_BACKEND_URL=https://your-domain.com
ADMIN_API_PORT=8001
```

### Nginx Configuration
File: `/etc/nginx/nginx.conf`

Key sections to verify:
- **Server blocks**: Correct domain names
- **SSL certificates**: Valid paths to certificates
- **Proxy settings**: Correct upstream servers
- **Security headers**: CSP and other headers

### Database Configuration
```bash
# Connect to database
sudo -u postgres psql -d stephenasatsa_prod

# Check tables
\dt

# Check users
\du
```

## 🔧 Service Management

### Starting/Stopping Services
```bash
# Start all services
sudo systemctl start stephenasatsa-frontend
sudo systemctl start stephenasatsa-backend

# Stop all services
sudo systemctl stop stephenasatsa-frontend
sudo systemctl stop stephenasatsa-backend

# Restart services
sudo systemctl restart stephenasatsa-frontend
sudo systemctl restart stephenasatsa-backend
```

### Enabling/Disabling Services
```bash
# Enable on boot
sudo systemctl enable stephenasatsa-frontend
sudo systemctl enable stephenasatsa-backend

# Disable on boot
sudo systemctl disable stephenasatsa-frontend
sudo systemctl disable stephenasatsa-backend
```

### Log Management
```bash
# View live logs
sudo journalctl -u stephenasatsa-frontend -f
sudo journalctl -u stephenasatsa-backend -f

# View recent logs
sudo journalctl -u stephenasatsa-frontend --since "1 hour ago"
sudo journalctl -u stephenasatsa-backend --since "1 hour ago"

# Rotate logs (if needed)
sudo logrotate -f /etc/logrotate.d/stephenasatsa
```

## 🔒 Security Considerations

### SSL Certificates
- **Auto-renewal**: Configured via cron job
- **Monitoring**: Check certificate expiry
- **Force HTTPS**: Nginx redirects HTTP to HTTPS

### Firewall Configuration
```bash
# Check firewall status
sudo ufw status verbose  # Ubuntu/Debian
sudo firewall-cmd --list-all  # CentOS/RHEL

# Allow additional ports if needed
sudo ufw allow 8080  # Custom port example
```

### Database Security
- **Password**: Auto-generated secure password
- **Network**: Localhost only access
- **Backups**: Regular backup schedule recommended

### Application Security
- **Environment variables**: Secure storage of secrets
- **Session management**: Secure cookie configuration
- **Rate limiting**: API endpoint protection
- **CORS**: Proper cross-origin configuration

## 📊 Monitoring and Maintenance

### System Monitoring
```bash
# System resources
htop
df -h
free -h

# Service status
sudo systemctl status stephenasatsa-*
```

### Application Monitoring
```bash
# Website response
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com

# API response time
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com/api/health
```

### Backup Procedures
```bash
# Database backup
sudo -u postgres pg_dump stephenasatsa_prod > backup_$(date +%Y%m%d).sql

# Files backup
sudo tar -czf files_backup_$(date +%Y%m%d).tar.gz /opt/stephenasatsa

# Configuration backup
sudo tar -czf config_backup_$(date +%Y%m%d).tar.gz /etc/nginx /opt/stephenasatsa/.env.production
```

## 🚨 Troubleshooting

### Common Issues

#### Services Won't Start
```bash
# Check port conflicts
sudo ss -tuln | grep -E ':(3000|8001|9001|9002|9003|9004)'

# Check permissions
sudo ls -la /opt/stephenasatsa/

# Check logs for errors
sudo journalctl -u stephenasatsa-frontend --since "10 minutes ago"
```

#### SSL Certificate Issues
```bash
# Test certificate
sudo certbot certificates

# Renew manually
sudo certbot renew --dry-run

# Check Nginx configuration
sudo nginx -t
```

#### Database Connection Issues
```bash
# Test database connection
sudo -u postgres psql -c "SELECT version();"

# Check PostgreSQL status
sudo systemctl status postgresql

# Check database exists
sudo -u postgres psql -l
```

#### Performance Issues
```bash
# Check system resources
free -h
df -h
top

# Check Nginx connections
sudo ss -tuln | grep :80
sudo ss -tuln | grep :443

# Check application logs for errors
sudo journalctl -u stephenasatsa-frontend --since "1 hour ago" | grep ERROR
```

### Emergency Procedures

#### Service Recovery
```bash
# Restart all services
sudo systemctl restart stephenasatsa-frontend
sudo systemctl restart stephenasatsa-backend
sudo systemctl restart nginx
sudo systemctl restart postgresql

# Full service restart
sudo systemctl restart stephenasatsa-*
```

#### Configuration Reset
```bash
# Restore from backup
sudo cp /etc/nginx/nginx.conf.backup /etc/nginx/nginx.conf
sudo systemctl reload nginx

# Reset environment file (use with caution)
sudo cp /opt/stephenasatsa/.env.production.backup /opt/stephenasatsa/.env.production
```

## 📞 Support

### Log Collection
For support requests, collect:
1. Installation log: `/var/log/stephenasatsa_install.log`
2. Service logs: `journalctl -u stephenasatsa-* --since "1 hour ago"`
3. System information: `uname -a`, `free -h`, `df -h`
4. Configuration files (sanitized): `/etc/nginx/nginx.conf`, `.env.production`

### Common Solutions
- **Port conflicts**: Stop conflicting services
- **Permission issues**: Verify www-data ownership
- **Memory issues**: Increase swap or upgrade server
- **Network issues**: Check firewall and DNS settings

## 🔄 Updates and Maintenance

### System Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade  # Ubuntu/Debian
sudo yum update  # CentOS/RHEL

# Update Node.js packages
cd /opt/stephenasatsa/apps/website
sudo -u www-data npm update

# Update Python packages
cd /opt/stephenasatsa/apps/website/backend
sudo -u www-data venv/bin/pip install -r requirements.txt --upgrade
```

### Application Updates
```bash
# Pull latest code
cd /opt/stephenasatsa
sudo -u www-data git pull origin main

# Rebuild frontend
cd apps/website
sudo -u www-data npm install
sudo -u www-data npm run build

# Restart services
sudo systemctl restart stephenasatsa-frontend
sudo systemctl restart stephenasatsa-backend
```

This deployment guide ensures reliable, secure, and maintainable production deployment of the Stephen Asatsa website.
