import { betterAuth } from "better-auth";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export const auth = betterAuth({
    database: pool,
    emailAndPassword: {    
        enabled: true
    } 
  });