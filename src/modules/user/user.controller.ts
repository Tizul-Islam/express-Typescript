import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const result = await userService.getSingleUserFromDB(id);
    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User Not found!",
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const result = await userService.updateUserFromDB(req.body, id);

    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User Not found!",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const result = await userService.deleteUserFromDB(id);

    if (result.rowCount === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User Not found!",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
