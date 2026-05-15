import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { iniDB } from "./db";
import { UserRoutes } from "./modules/user/user.route";

const app: Application = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

iniDB();

app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Express Server",
    author: "hello_tizul",
  });
});

app.use("/api/user", UserRoutes);

export default app;
