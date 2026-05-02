from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os
import secrets
import hashlib
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Admin credentials
ADMIN_EMAIL = "admin@localhost"
ADMIN_PASSWORD = "ChangeMe123!"

# In-memory storage
tokens = {}
user_profiles = {
    ADMIN_EMAIL: {
        "email": ADMIN_EMAIL,
        "password_hash": generate_password_hash(ADMIN_PASSWORD),
        "role": "admin",
        "created": datetime.now().isoformat(),
        "last_login": None
    }
}

def generate_token():
    return secrets.token_urlsafe(32)

def verify_password(email, password):
    if email in user_profiles:
        return check_password_hash(user_profiles[email]["password_hash"], password)
    return False

@app.route("/")
def root():
    return jsonify({"message": "Stephen Asatsa Website Admin API", "version": "1.0.0"})

@app.route("/api/health")
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

@app.route("/api/admin/auth/login", methods=["POST"])
def admin_login():
    """Admin login endpoint that accepts username"""
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        
        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400
        
        # For admin login, treat username as email if it contains @, otherwise use admin email
        email = username if "@" in username else ADMIN_EMAIL
        
        if not verify_password(email, password):
            return jsonify({"error": "Invalid username or password"}), 401
        
        # Generate token
        token = generate_token()
        
        tokens[token] = {
            "email": email,
            "username": username,
            "created": datetime.now().timestamp(),
            "role": "admin"
        }
        
        # Update last login
        if email in user_profiles:
            user_profiles[email]["last_login"] = datetime.now().isoformat()
        
        return jsonify({
            "authenticated": True,
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "username": username,
                "email": email,
                "displayName": "Website Administrator",
                "role": "admin"
            }
        })
    except Exception as e:
        return jsonify({"error": "Invalid request"}), 400

@app.route("/api/admin/health")
def admin_health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 6354))
    app.run(host="0.0.0.0", port=port, debug=True)
