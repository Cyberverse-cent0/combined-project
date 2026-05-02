-- Fix admin role for admin@scholarsforge.com
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@scholarsforge.com';

-- Verify the fix
SELECT id, email, role FROM users WHERE email = 'admin@scholarsforge.com';
