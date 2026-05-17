import type { Request, Response } from "express";
import { authService } from "./auth.server";

const loginUser = async (req: Request, res: Response) => {
  try {

    const result = await authService.loginUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "user login success",
      data:result,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error
    });
  }
};
export const authController = { loginUser };
