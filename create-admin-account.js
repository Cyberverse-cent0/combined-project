// Script to create admin account in the database
const { createClient } = require('@supabase/supabase-js');
const { nanoid } = require('./Schoolars-work-bench/artifacts/api-server/src/lib/nanoid');
const { hashPassword } = require('./Schoolars-work-bench/artifacts/api-server/src/lib/auth');

// Database connection - you'll need to update this with your actual database URL
const supabaseUrl = process.env.DATABASE_URL || 'your-database-url-here';
const supabaseKey = process.env.DATABASE_KEY || 'your-database-key-here';

async function createAdminAccount() {
  try {
    console.log('Creating admin account...');
    
    // Generate admin data
    const adminId = nanoid();
    const adminEmail = 'admin@scholarsforge.com';
    const adminPassword = 'admin123';
    const passwordHash = hashPassword(adminPassword);
    
    console.log('Admin ID:', adminId);
    console.log('Email:', adminEmail);
    console.log('Password Hash created');
    
    // Insert admin user into database
    const adminData = {
      id: adminId,
      name: 'System Administrator',
      email: adminEmail,
      password_hash: passwordHash,
      role: 'ADMIN',
      institution: 'Scholars Forge',
      research_interests: 'System Administration',
      bio: 'System administrator for Scholars Forge platform',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_active: new Date().toISOString()
    };
    
    console.log('Admin data prepared:', {
      id: adminData.id,
      email: adminData.email,
      role: adminData.role,
      name: adminData.name
    });
    
    // For now, let's create a simple SQL script you can run manually
    const sqlScript = `
-- Insert admin user
INSERT INTO users (
  id, 
  name, 
  email, 
  password_hash, 
  role, 
  institution, 
  research_interests, 
  bio, 
  created_at, 
  updated_at, 
  last_active
) VALUES (
  '${adminId}',
  'System Administrator',
  '${adminEmail}',
  '${passwordHash}',
  'ADMIN',
  'Scholars Forge',
  'System Administration',
  'System administrator for Scholars Forge platform',
  NOW(),
  NOW(),
  NOW()
);

-- Verify admin was created
SELECT id, email, role, created_at FROM users WHERE role = 'ADMIN';
    `;
    
    console.log('\n=== SQL SCRIPT TO RUN ===');
    console.log(sqlScript);
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\nIMPORTANT: Change password after first login!');
    
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
}

createAdminAccount();
