// Development configuration - single instances, verbose logging
module.exports = {
  apps: [
    {
      name: 'website-frontend',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/codecrafter/Documents/combined/website',
      instances: 1,
      exec_mode: 'fork',
      env: { NODE_ENV: 'development' },
      error_file: './logs/website-frontend-error.log',
      out_file: './logs/website-frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      autorestart: true,
      max_memory_restart: '512M'
    },
    {
      name: 'website-backend',
      script: 'python3',
      args: 'backend/server.py',
      cwd: '/home/codecrafter/Documents/combined/website',
      instances: 1,
      exec_mode: 'fork',
      env: { PYTHONUNBUFFERED: '1' },
      error_file: './logs/website-backend-error.log',
      out_file: './logs/website-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      autorestart: true,
      max_memory_restart: '512M'
    }
  ]
};
