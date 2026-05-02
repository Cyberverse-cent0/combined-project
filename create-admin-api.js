// Direct API call to create admin account
const https = require('https');
const http = require('http');

const adminData = {
  name: 'System Administrator',
  email: 'admin@scholarsforge.com',
  password: 'admin123',
  institution: 'Scholars Forge',
  researchInterests: 'System Administration'
};

function createAdminAccount() {
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
        console.log('=== ADMIN ACCOUNT CREATED ===');
        console.log('Response:', result);
        console.log('\n=== LOGIN CREDENTIALS ===');
        console.log('Email:', adminData.email);
        console.log('Password:', adminData.password);
        console.log('\nYou can now login at: http://localhost:4500/signin');
        
        if (result.user) {
          console.log('User Role:', result.user.role);
          console.log('User ID:', result.user.id);
        }
      } catch (error) {
        console.error('Error parsing response:', error);
        console.log('Raw response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error creating admin account:', error.message);
    console.log('\n=== ALTERNATIVE METHOD ===');
    console.log('Try signing up manually at: http://localhost:4500/signup');
    console.log('First user automatically gets ADMIN role');
  });

  req.write(data);
  req.end();
}

createAdminAccount();
