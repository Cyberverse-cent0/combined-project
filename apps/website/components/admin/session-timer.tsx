"use client";

import { Clock, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "./session-provider";

export function SessionTimer() {
  const { isAuthenticated, sessionId, keepAlive } = useSession();
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !sessionId) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        
        // Show warning when 60 seconds remaining
        if (newTime === 60 && !showWarning) {
          setShowWarning(true);
        }
        
        // Hide warning after 10 seconds
        if (newTime === 50) {
          setShowWarning(false);
        }
        
        // Auto-extend session at 30 seconds
        if (newTime === 30) {
          keepAlive(); // Extend session
          return 300; // Reset to 5 minutes
        }
        
        return newTime > 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, sessionId, showWarning]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 60) return 'text-red-400';
    if (timeRemaining <= 120) return 'text-yellow-400';
    return 'text-green-400';
  };

  const extendSession = () => {
    keepAlive();
    setTimeRemaining(300);
    setShowWarning(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* Session Timer */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 flex items-center gap-2">
        <Clock className={`w-4 h-4 ${getTimeColor()}`} />
        <span className={`text-sm font-medium ${getTimeColor()}`}>
          Session: {formatTime(timeRemaining)}
        </span>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm mx-4 space-y-4">
            <div className="flex items-center gap-3 text-yellow-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-white">Session Expiring Soon</h3>
            </div>
            
            <p className="text-white/80 text-sm">
              Your session will expire in {formatTime(timeRemaining)} due to inactivity.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={extendSession}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Extend Session
              </button>
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
