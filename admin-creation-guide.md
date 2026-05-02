# Admin Account Creation Guide

## Method 1: First User Signup (Easiest)
1. Clear browser data (cookies, cache, local storage)
2. Navigate to: http://localhost:4500/signup
3. Fill out the signup form with any email/password
4. The first user automatically gets ADMIN role
5. Login with your new credentials

## Method 2: Database Direct Creation
If you have database access, run this SQL:

```sql
INSERT INTO users (
  id, 
  name, 
  email, 
  password_hash, 
  role, 
  created_at, 
  updated_at
) VALUES (
  'admin-id-here',
  'System Admin',
  'admin@scholarsforge.com',
  'hashed-password-here',
  'ADMIN',
  NOW(),
  NOW()
);
```

## Method 3: Check Existing Admin
To check if admin exists, look at the users table:
```sql
SELECT email, role FROM users WHERE role = 'ADMIN';
```

## Default Admin Credentials (if using script)
- Email: admin@scholarsforge.com
- Password: admin123
- **IMPORTANT**: Change password immediately after login!

## Login Steps
1. Go to: http://localhost:4500/signin
2. Enter admin credentials
3. You'll have access to admin dashboard at: /admin

## Admin Features Available
- User management
- Template management
- System settings
- Analytics dashboard
- Message management
