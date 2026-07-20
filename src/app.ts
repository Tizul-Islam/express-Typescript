import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./modules/user/user.route";
import { profileRoutes } from "./modules/profile/profile.route";
import { authRoutes } from "./modules/auth/auth.route";
import logger from "./middleware/logger";

const app: Application = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger)


app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!')
  res.status(200).json({
    message: "Express Server",
    author: "hello_tizul",
  });
});

app.use("/api/user", UserRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);

export default app;
