import config from "../config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../db";


const auth = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers.authorization); 
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access!!"
    });
  }

  const decoded = jwt.verify(token as string,config.secret as string) as JwtPayload;
// console.log(decoded)

const userData = await pool.query(`SELECT * FROM users WHERE email = $1`,[decoded.email])
if(userData.rows.length === 0){
   return res.status(401).json({
    success: false, 
    message: "user not found!"
  });  
} 

if(!userData.rows[0].is_active){
  return res.status(401).json({
    success: false, 
    message: "user not active!"
  });  
}

  next();
};

export default auth;
