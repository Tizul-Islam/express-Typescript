import dotenv from "dotenv"
import path from "node:path"
dotenv.config({ path: path.resolve("config", ".env") })

const config ={
    connection_string: process.env.DATABASE_URL as string,
    port : process.env.PORT as unknown as number,
}
export default config 