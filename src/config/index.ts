import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: (process.env.DATABASE_URL || process.env.CONNECTIONSTRING) as string,
  port: process.env.PORT || 5000,
  secret: process.env.JWT_SECRET || "super_secret_key",
  refresh_secret: process.env.JWT_REFRESH_SECRET || "super_refresh_secret_key",
};

export default config;