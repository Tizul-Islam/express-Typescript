npm init -y
npm i -D typescript
npx tsc --init 
npm install express --save 
npm i -D @types/express
npm i tsx



npm i pg //install pg for the database (postgresql)
npm i --save-dev @types/pg

import {Pool} from "pg"
const pool =new Pool {
 connectionString = "postgresql://neondb_owner:npg_NcIf3ix8SOyP@ep-billowing-hill-aqpdzcbx-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
}



.env 
npm i dotenv

auth
npm i bcrypt


npm i jsonwebtoken