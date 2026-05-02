-- SQL script to upgrade admin@scholarsforge.com to ADMIN role
-- Run this script in your database to fix the admin role

UPDATE users 
SET role = 'ADMIN' 
WHERE email = 'admin@scholarsforge.com';

-- Verify the update
SELECT id, email, role, created_at 
FROM users 
WHERE email = 'admin@scholarsforge.com';

-- Check all admin users
SELECT id, email, role, created_at 
FROM users 
WHERE role = 'ADMIN';
