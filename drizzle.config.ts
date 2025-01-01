import "dotenv/config"
import { defineConfig } from 'drizzle-kit';

// console.log("DB_URL:", process.env.DB_URL ? "Available" : "Missing");
// console.log("DB_TOKEN:", process.env.DB_TOKEN ? "Available" : "Missing");

export default defineConfig({
  schema: './src/db/tables.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.DB_URL!,
    authToken: process.env.DB_TOKEN!,
  },
  verbose: true,
  strict: true,
  
});