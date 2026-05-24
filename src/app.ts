import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import logger from "./middleware/logger";
import { authRoutes } from "./modules/auth/auth.route";
import { profileRoutes } from "./modules/profile/profile.route";
import { UserRoutes } from "./modules/user/user.route";
import { bookingRoutes } from "./modules/booking/booking.route";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", UserRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
