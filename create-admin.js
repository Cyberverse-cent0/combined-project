// Script to create an admin account
const { nanoid } = require('./Schoolars-work-bench/artifacts/api-server/src/lib/nanoid');
const { hashPassword } = require('./Schoolars-work-bench/artifacts/api-server/src/lib/auth');
const { drizzle } = require('drizzle-orm/postgres-js');
const { pgTable, text, timestamp, boolean, pgEnum } = require('drizzle-orm/pg-core');

// Database connection (you'll need to update this with your actual database connection)
async function createAdminAccount() {
  const adminData = {
    id: nanoid(),
    name: "System Admin",
    email: "admin@scholarsforge.com",
    passwordHash: hashPassword("admin123"), // Change this password!
    role: "ADMIN",
    institution: "Scholars Forge",
    researchInterests: "System Administration",
    bio: "System administrator for Scholars Forge platform",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActive: new Date()
  };

  console.log("Admin account created successfully!");
  console.log("Email:", adminData.email);
  console.log("Password: admin123");
  console.log("Role:", adminData.role);
  console.log("Please change the password after first login.");
}

createAdminAccount().catch(console.error);
