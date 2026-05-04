#!/bin/bash

# Stephen Asatsa Website Deployment Test Script
# Validates that all services are running correctly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test configuration
PROJECT_NAME="stephenasatsa"
INSTALL_DIR="/opt/$PROJECT_NAME"
DOMAIN="localhost"
FRONTEND_PORT=3000
BACKEND_PORT=8001
GO_SERVICES_PORTS=(9001 9002 9003 9004)

# Utility functions
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

failure() {
    echo -e "${RED}✗ $1${NC}"
}

# Test systemd services
test_systemd_services() {
    log "Testing systemd services..."

    services=("stephenasatsa-frontend" "stephenasatsa-backend" "stephenasatsa-go-password" "stephenasatsa-go-telemetry" "stephenasatsa-go-image" "stephenasatsa-go-worker" "nginx" "postgresql")
    
    for service in "${services[@]}"; do
        if systemctl is-active --quiet $service; then
            success "$service is running"
        else
            failure "$service is not running"
            return 1
        fi
    done

    log "All systemd services are running"
}

# Test port accessibility
test_ports() {
    log "Testing port accessibility..."

    # Test frontend port
    if curl -s --connect-timeout 5 http://localhost:$FRONTEND_PORT >/dev/null; then
        success "Frontend port $FRONTEND_PORT is accessible"
    else
        failure "Frontend port $FRONTEND_PORT is not accessible"
        return 1
    fi

    # Test backend port
    if curl -s --connect-timeout 5 http://localhost:$BACKEND_PORT/health >/dev/null; then
        success "Backend port $BACKEND_PORT is accessible"
    else
        failure "Backend port $BACKEND_PORT is not accessible"
        return 1
    fi

    # Test Go services ports
    for port in "${GO_SERVICES_PORTS[@]}"; do
        if curl -s --connect-timeout 5 http://localhost:$port >/dev/null; then
            success "Go service port $port is accessible"
        else
            warn "Go service port $port is not accessible (may be normal)"
        fi
    done

    log "Port accessibility test completed"
}

# Test HTTP responses
test_http_responses() {
    log "Testing HTTP responses..."

    # Test frontend homepage
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$FRONTEND_PORT)
    if [[ $HTTP_CODE == "200" ]]; then
        success "Frontend homepage returns HTTP 200"
    else
        failure "Frontend homepage returns HTTP $HTTP_CODE"
        return 1
    fi

    # Test backend health endpoint
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$BACKEND_PORT/health)
    if [[ $HTTP_CODE == "200" ]]; then
        success "Backend health endpoint returns HTTP 200"
    else
        failure "Backend health endpoint returns HTTP $HTTP_CODE"
        return 1
    fi

    # Test API proxy through nginx
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/health)
    if [[ $HTTP_CODE == "200" ]]; then
        success "API proxy through nginx works"
    else
        failure "API proxy through nginx returns HTTP $HTTP_CODE"
        return 1
    fi

    log "HTTP response tests completed"
}

# Test database connectivity
test_database() {
    log "Testing database connectivity..."

    # Test if PostgreSQL is running
    if systemctl is-active --quiet postgresql; then
        success "PostgreSQL service is running"
    else
        failure "PostgreSQL service is not running"
        return 1
    fi

    # Test database connection (simple check)
    if sudo -u postgres psql -c "SELECT 1;" >/dev/null 2>&1; then
        success "Database connection test passed"
    else
        failure "Database connection test failed"
        return 1
    fi

    log "Database connectivity test completed"
}

# Test file permissions
test_file_permissions() {
    log "Testing file permissions..."

    # Check project directory permissions
    if [[ -d "$INSTALL_DIR" ]]; then
        success "Project directory exists at $INSTALL_DIR"
        
        # Check ownership
        OWNER=$(stat -c "%U:%G" "$INSTALL_DIR")
        if [[ "$OWNER" == "www-data:www-data" ]]; then
            success "Project directory has correct ownership"
        else
            failure "Project directory has incorrect ownership: $OWNER"
            return 1
        fi
    else
        failure "Project directory does not exist at $INSTALL_DIR"
        return 1
    fi

    # Check log directory
    if [[ -d "/var/log/$PROJECT_NAME" ]]; then
        success "Log directory exists"
        
        OWNER=$(stat -c "%U:%G" "/var/log/$PROJECT_NAME")
        if [[ "$OWNER" == "www-data:www-data" ]]; then
            success "Log directory has correct ownership"
        else
            failure "Log directory has incorrect ownership: $OWNER"
            return 1
        fi
    else
        failure "Log directory does not exist"
        return 1
    fi

    # Check environment file
    if [[ -f "$INSTALL_DIR/.env.production" ]]; then
        success "Environment file exists"
        
        # Check permissions (should be 600)
        PERMS=$(stat -c "%a" "$INSTALL_DIR/.env.production")
        if [[ "$PERMS" == "600" ]]; then
            success "Environment file has correct permissions"
        else
            failure "Environment file has incorrect permissions: $PERMS"
            return 1
        fi
    else
        failure "Environment file does not exist"
        return 1
    fi

    log "File permissions test completed"
}

# Test SSL configuration
test_ssl() {
    log "Testing SSL configuration..."

    # Check if SSL certificates exist
    if [[ -f "/etc/ssl/certs/localhost.crt" ]] || [[ -f "/etc/letsencrypt/live/localhost/fullchain.pem" ]]; then
        success "SSL certificates found"
    else
        warn "SSL certificates not found (may be normal for localhost)"
    fi

    # Test nginx SSL configuration
    if nginx -t >/dev/null 2>&1; then
        success "Nginx configuration is valid"
    else
        failure "Nginx configuration is invalid"
        nginx -t
        return 1
    fi

    log "SSL configuration test completed"
}

# Test application functionality
test_application() {
    log "Testing application functionality..."

    # Test frontend build
    if [[ -f "$INSTALL_DIR/apps/website/.next/build-manifest.json" ]]; then
        success "Frontend build exists"
    else
        failure "Frontend build does not exist"
        return 1
    fi

    # Test backend Python environment
    if [[ -d "$INSTALL_DIR/apps/website/backend/venv" ]]; then
        success "Python virtual environment exists"
    else
        failure "Python virtual environment does not exist"
        return 1
    fi

    # Test Go services binaries
    GO_SERVICES=("password-service" "telemetry-service" "image-service" "worker-service")
    for service in "${GO_SERVICES[@]}"; do
        if [[ -f "$INSTALL_DIR/apps/website/backend/go-services/$service/$service" ]]; then
            success "Go service binary exists: $service"
        else
            failure "Go service binary not found: $service"
            return 1
        fi
    done

    log "Application functionality test completed"
}

# Performance test
test_performance() {
    log "Testing basic performance..."

    # Test frontend response time
    START_TIME=$(date +%s%N)
    curl -s http://localhost:$FRONTEND_PORT >/dev/null
    END_TIME=$(date +%s%N)
    RESPONSE_TIME=$((($END_TIME - $START_TIME) / 1000000)) # Convert to milliseconds

    if [[ $RESPONSE_TIME -lt 2000 ]]; then
        success "Frontend response time: ${RESPONSE_TIME}ms"
    else
        warn "Frontend response time is slow: ${RESPONSE_TIME}ms"
    fi

    # Test backend response time
    START_TIME=$(date +%s%N)
    curl -s http://localhost:$BACKEND_PORT/health >/dev/null
    END_TIME=$(date +%s%N)
    RESPONSE_TIME=$((($END_TIME - $START_TIME) / 1000000)) # Convert to milliseconds

    if [[ $RESPONSE_TIME -lt 1000 ]]; then
        success "Backend response time: ${RESPONSE_TIME}ms"
    else
        warn "Backend response time is slow: ${RESPONSE_TIME}ms"
    fi

    log "Performance test completed"
}

# Security test
test_security() {
    log "Testing basic security..."

    # Test if running as non-root for application services
    if ps aux | grep "stephenasatsa-frontend" | grep -v grep | grep -q "www-data"; then
        success "Frontend service running as www-data"
    else
        warn "Frontend service may not be running as www-data"
    fi

    # Test if firewall is enabled
    if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
        success "Firewall (ufw) is enabled"
    elif command -v firewall-cmd >/dev/null && firewall-cmd --state >/dev/null 2>&1; then
        success "Firewall (firewalld) is enabled"
    else
        warn "Firewall status unknown or not enabled"
    fi

    # Test for security headers
    SECURITY_HEADERS=$(curl -I http://localhost:$FRONTEND_PORT 2>/dev/null | grep -i "x-frame-options\|x-content-type-options\|x-xss-protection")
    if [[ -n "$SECURITY_HEADERS" ]]; then
        success "Security headers are present"
    else
        warn "Security headers may be missing"
    fi

    log "Security test completed"
}

# Generate test report
generate_report() {
    log "Generating test report..."

    REPORT_FILE="/var/log/$PROJECT_NAME/deployment-test-$(date +%Y%m%d_%H%M%S).log"
    
    {
        echo "=== Stephen Asatsa Website Deployment Test Report ==="
        echo "Date: $(date)"
        echo "Server: $(hostname)"
        echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'=' -f2 | tr -d '"')"
        echo ""
        echo "=== Service Status ==="
        systemctl status stephenasatsa-* --no-pager | grep "Active:"
        echo ""
        echo "=== Port Status ==="
        ss -tlnp | grep -E ":(3000|8001|900[1-4])"
        echo ""
        echo "=== Resource Usage ==="
        echo "Memory: $(free -h | grep Mem)"
        echo "Disk: $(df -h / | tail -1)"
        echo "CPU Load: $(uptime)"
        echo ""
        echo "=== Recent Logs ==="
        journalctl -u stephenasatsa-frontend --no-pager -n 5
        journalctl -u stephenasatsa-backend --no-pager -n 5
    } > "$REPORT_FILE"

    success "Test report generated: $REPORT_FILE"
}

# Main test function
main() {
    echo -e "${BLUE}"
    echo "======================================"
    echo "  Stephen Asatsa Website Test Suite"
    echo "======================================"
    echo -e "${NC}"

    # Check if running as root
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root"
    fi

    # Run all tests
    local failed=0

    test_systemd_services || failed=1
    test_ports || failed=1
    test_http_responses || failed=1
    test_database || failed=1
    test_file_permissions || failed=1
    test_ssl || failed=1
    test_application || failed=1
    test_performance || failed=1
    test_security || failed=1

    # Generate report
    generate_report

    # Final result
    echo ""
    if [[ $failed -eq 0 ]]; then
        echo -e "${GREEN}======================================"
        echo "  ALL TESTS PASSED SUCCESSFULLY!"
        echo "======================================"
        echo -e "${NC}"
        echo "The Stephen Asatsa website deployment is working correctly."
        echo "You can access the website at: http://localhost"
        echo "Admin panel: http://localhost/admin"
        exit 0
    else
        echo -e "${RED}======================================"
        echo "  SOME TESTS FAILED!"
        echo "======================================"
        echo -e "${NC}"
        echo "Please check the failed tests above and fix the issues."
        echo "Review the test report for detailed information."
        exit 1
    fi
}

# Run main function
main "$@"
