// Authentication utilities for consistent role handling across the application

// Define all valid admin roles
export const ADMIN_ROLES = ['ADMIN', 'super_admin', 'administrator', 'admin'] as const;
export const DEFAULT_ADMIN_ROLE = 'super_admin' as const;

// Type definitions
export type AdminRole = typeof ADMIN_ROLES[number];

export interface AuthSession {
  authenticated: boolean;
  role: string;
  username: string;
  displayName?: string;
  email?: string;
  image?: string;
}

/**
 * Check if a role has admin privileges
 */
export function isAdminRole(role: string): boolean {
  return ADMIN_ROLES.includes(role as AdminRole);
}

/**
 * Validate admin session
 */
export function validateAdminAccess(session: AuthSession): boolean {
  return session.authenticated && isAdminRole(session.role);
}

/**
 * Get default admin role
 */
export function getDefaultAdminRole(): string {
  return DEFAULT_ADMIN_ROLE;
}

/**
 * Create admin session object
 */
export function createAdminSession(userData: {
  username: string;
  displayName?: string;
  role?: string;
  email?: string;
  image?: string;
}): AuthSession {
  return {
    authenticated: true,
    role: userData.role || getDefaultAdminRole(),
    username: userData.username,
    displayName: userData.displayName || userData.username,
    email: userData.email,
    image: userData.image
  };
}

/**
 * Check if user has sufficient privileges for a given role
 */
export function hasAdminPrivileges(role: string, requiredRole?: AdminRole): boolean {
  if (!isAdminRole(role)) {
    return false;
  }
  
  // If no specific role required, any admin role is sufficient
  if (!requiredRole) {
    return true;
  }
  
  // Role hierarchy: super_admin > ADMIN > admin > administrator
  const roleHierarchy = {
    'administrator': 1,
    'admin': 2,
    'ADMIN': 2,
    'super_admin': 3
  };
  
  const userLevel = roleHierarchy[role as AdminRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: string): string {
  const roleNames: Record<string, string> = {
    'administrator': 'Administrator',
    'admin': 'Admin',
    'ADMIN': 'Admin',
    'super_admin': 'Super Admin'
  };
  
  return roleNames[role] || role;
}

/**
 * Debug authentication state
 */
export function debugAuthState(session: AuthSession): void {
  console.log('Auth State Debug:', {
    authenticated: session.authenticated,
    role: session.role,
    username: session.username,
    isAdmin: validateAdminAccess(session),
    validRoles: ADMIN_ROLES
  });
}
