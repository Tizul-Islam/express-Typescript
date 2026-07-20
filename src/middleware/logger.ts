import { Request, Response, NextFunction } from "express";
import fs from "node:fs"

const logger =(req:Request, res:Response, next:NextFunction) => {
  console.log('Method - URL - Time:', req.method, req.url, Date.now()) 
  const log = `\nMethod -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}\n`;
  fs.appendFile("logger.txt",log,(err) =>{
    if (err) {
      console.log(err);
    }
  })
  next()
}
export default logger;