import dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env" });

const config = {
  connection_string: process.env.DATABASE_URL as string,
  port: process.env.PORT as unknown as number,
  secret: process.env.JWT_SECRET as string,
};
export default config;
