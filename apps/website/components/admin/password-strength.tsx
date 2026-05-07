"use client";

import { Lock, Shield, AlertTriangle, Check } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (pwd: string): { score: number; label: string; color: string } => {
    if (!pwd) return { score: 0, label: 'Enter password', color: 'text-gray-400' };
    
    let score = 0;
    
    // Length check
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    
    // Character variety checks
    if (/[a-z]/.test(pwd)) score++; // lowercase
    if (/[A-Z]/.test(pwd)) score++; // uppercase
    if (/[0-9]/.test(pwd)) score++; // numbers
    if (/[^A-Za-z0-9]/.test(pwd)) score++; // special characters
    
    if (score <= 2) return { score, label: 'Weak', color: 'text-red-500' };
    if (score <= 4) return { score, label: 'Fair', color: 'text-yellow-500' };
    if (score <= 6) return { score, label: 'Good', color: 'text-blue-500' };
    return { score, label: 'Strong', color: 'text-green-500' };
  };
  
  const strength = calculateStrength(password);
  
  const getIcon = () => {
    if (strength.score <= 2) return <AlertTriangle className={`w-4 h-4 ${strength.color}`} />;
    if (strength.score <= 4) return <Lock className={`w-4 h-4 ${strength.color}`} />;
    return <Shield className={`w-4 h-4 ${strength.color}`} />;
  };
  
  const getRequirements = () => {
    const requirements = [
      { met: password.length >= 8, text: 'At least 8 characters' },
      { met: password.length >= 12, text: '12+ characters (recommended)' },
      { met: /[a-z]/.test(password), text: 'Lowercase letters' },
      { met: /[A-Z]/.test(password), text: 'Uppercase letters' },
      { met: /[0-9]/.test(password), text: 'Numbers' },
      { met: /[^A-Za-z0-9]/.test(password), text: 'Special characters' }
    ];
    
    return requirements;
  };
  
  return (
    <div className="space-y-3">
      {/* Strength indicator */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/70">Password Strength:</span>
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            strength.score <= 2 ? 'bg-red-500 w-1/4' :
            strength.score <= 4 ? 'bg-yellow-500 w-2/4' :
            strength.score <= 6 ? 'bg-blue-500 w-3/4' :
            'bg-green-500 w-full'
          }`}
        />
      </div>
      
      {/* Requirements checklist */}
      <div className="space-y-2">
        <p className="text-xs text-white/60">Password requirements:</p>
        <div className="grid grid-cols-1 gap-1">
          {getRequirements().map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                req.met ? 'bg-green-500' : 'bg-white/20'
              }`}>
                {req.met && <Check className="w-2 h-2 text-white" />}
              </div>
              <span className={req.met ? 'text-white/80' : 'text-white/50'}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
