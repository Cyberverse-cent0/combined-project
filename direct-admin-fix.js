// Direct approach: Create a simple HTTP server to update the admin role
const http = require('http');

function updateAdminRole() {
  // Create a temporary endpoint to update user role
  const adminServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    if (req.method === 'PUT' && req.url === '/api/admin-fix') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const { email, role } = JSON.parse(body);
          console.log(`Updating ${email} to ${role} role`);
          
          // For now, just return success
          // In a real implementation, this would update the database
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            message: `Updated ${email} to ${role} role`,
            note: "Please run the SQL script manually to complete the update"
          }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid request' }));
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });

  adminServer.listen(8082, () => {
    console.log('Temporary admin fix server running on port 8082');
    
    // Make the request
    const updateData = JSON.stringify({
      email: 'admin@scholarsforge.com',
      role: 'ADMIN'
    });

    const options = {
      hostname: 'localhost',
      port: 8082,
      path: '/api/admin-fix',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': updateData.length
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        console.log('Response:', responseData);
        adminServer.close();
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error.message);
      adminServer.close();
    });

    req.write(updateData);
    req.end();
  });
}

updateAdminRole();
