"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Shield, Lock, Mail, User } from "lucide-react";
import { api } from "@/components/api/client";

export default function AdminSignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check backend status
  useEffect(() => {
    const checkBackend = async () => {
      setBackendStatus('checking');
      try {
        const response = await api.get('/api/admin/health');
        if (response.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch (error) {
        console.error('Backend health check failed:', error);
        setBackendStatus('offline');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (backendStatus === 'offline') {
      setError("Backend server is not available. Please start it manually.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const response = await api.post('/api/admin/auth/login', {
        username: username,
        password: password,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || `Server error: ${response.status}`);
      } else {
        const data = await response.json();

        // Store user session data
        localStorage.setItem("userSession", JSON.stringify({
          username: data.user?.username || username,
          displayName: data.user?.displayName || "Website Administrator",
          role: data.user?.role || "admin",
          authenticated: data.authenticated,
          timestamp: Date.now()
        }));

        // Redirect to admin dashboard
        router.push("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        setError("Cannot connect to the backend server. Please ensure the Python backend is running.");
      } else if (error instanceof TypeError && error.message.includes("NetworkError")) {
        setError("Network error. Please check your connection and ensure the backend server is running.");
      } else {
        setError(`Login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Sign In</h1>
            <p className="text-slate-600">Enter your credentials to access the admin dashboard</p>
          </div>

          {/* Backend Status */}
          <div className="mb-6">
            {backendStatus === 'checking' && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Checking backend...</span>
              </div>
            )}
            {backendStatus === 'online' && (
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Backend Connected</span>
              </div>
            )}
            {backendStatus === 'offline' && (
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className="text-sm">Backend Offline</span>
              </div>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || backendStatus === 'offline'}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Secure Admin Portal • Manage your website with confidence
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
