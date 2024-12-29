import { drizzle } from 'drizzle-orm/libsql';
import "dotenv/config"

console.log("DB_URL:", process.env.DB_URL ? "Available" : "Missing");
console.log("DB_TOKEN:", process.env.DB_TOKEN ? "Available" : "Missing");

export const db = drizzle({ connection: {
  url: process.env.DB_URL!,
  authToken: process.env.DB_TOKEN!,
}});