// Script to upgrade existing user to ADMIN role
const http = require('http');

function upgradeToAdmin() {
  const userId = 'IvLpwSvnyNWo_ekpNpUQO'; // The admin user ID we just created
  
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: `/api/users/${userId}/role`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const data = JSON.stringify({ role: 'ADMIN' });

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(responseData);
        console.log('=== USER UPGRADED TO ADMIN ===');
        console.log('Response:', result);
        console.log('\n=== LOGIN CREDENTIALS ===');
        console.log('Email: admin@scholarsforge.com');
        console.log('Password: admin123');
        console.log('\nYou can now login with admin privileges at: http://localhost:4500/signin');
      } catch (error) {
        console.error('Error parsing response:', error);
        console.log('Raw response:', responseData);
        
        // Try alternative approach - direct database update
        console.log('\n=== ALTERNATIVE: DATABASE UPDATE ===');
        console.log('Run this SQL to upgrade the user:');
        console.log(`UPDATE users SET role = 'ADMIN' WHERE email = 'admin@scholarsforge.com';`);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error upgrading user:', error.message);
    console.log('\n=== MANUAL DATABASE UPDATE ===');
    console.log('Please run this SQL to upgrade the user to admin:');
    console.log("UPDATE users SET role = 'ADMIN' WHERE email = 'admin@scholarsforge.com';");
  });

  req.write(data);
  req.end();
}

upgradeToAdmin();
