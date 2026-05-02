// Create a new admin account with unique email
const http = require('http');

function createNewAdmin() {
  // Use a unique email to ensure it becomes the first user
  const adminData = {
    name: 'System Administrator',
    email: 'system.admin@scholarsforge.com', // Different email
    password: 'admin123',
    institution: 'Scholars Forge',
    researchInterests: 'System Administration'
  };
  
  const data = JSON.stringify(adminData);
  
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: '/api/auth/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(responseData);
        console.log('=== NEW ADMIN ACCOUNT CREATED ===');
        console.log('Response:', result);
        console.log('\n=== LOGIN CREDENTIALS ===');
        console.log('Email:', adminData.email);
        console.log('Password:', adminData.password);
        console.log('\nYou can now login at: http://localhost:4500/signin');
        
        if (result.user) {
          console.log('User Role:', result.user.role);
          console.log('User ID:', result.user.id);
          
          if (result.user.role === 'ADMIN') {
            console.log('✅ SUCCESS: Admin account created with ADMIN privileges!');
          } else {
            console.log('⚠️  WARNING: User role is', result.user.role, 'instead of ADMIN');
          }
        }
      } catch (error) {
        console.error('Error parsing response:', error);
        console.log('Raw response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error creating admin account:', error.message);
  });

  req.write(data);
  req.end();
}

createNewAdmin();
