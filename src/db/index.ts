import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const iniDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT true,
        age INT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        gender VARCHAR(50) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
`);

await pool.query(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;`);
await pool.query(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;`);
    console.log("database connected");
  } catch (error) {
    console.log("error", error);
  }
};