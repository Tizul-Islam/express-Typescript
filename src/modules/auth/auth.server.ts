import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";


const loginUserIntoDB = async (payload:{
    email:string;
    password: string;
}) => {
const { email, password } = payload;

const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

if (userData.rows.length === 0) {
    throw new Error("User not found!");
}

const user = userData.rows[0];
// console.log(user);
const matchPassword = await bcrypt.compare(password, user.password);

if (!matchPassword) {
    throw new Error("Invalid password!");
}

const jwtpayload = {
    id:user.id,
    name: user.name,
    is_active: user.is_active,
    email:user.email
}
const token = jwt.sign(jwtpayload,config.secret as string,{
    expiresIn:"1d"
})
return token; 
};

export const authService = {
    loginUserIntoDB

};
export const authController = { loginUserIntoDB };