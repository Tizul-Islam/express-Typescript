import { Request, Response } from "express";
import { userService } from "./user.service";
import { IUser } from "./user.interface";

const createUser = async (req: Request, res: Response)=> {
  try {
    const { name, email, password, age } = req.body;

    const existingUsers = await userService.checkDuplicateUser(email, name);
    if (existingUsers && existingUsers.length > 0) {
      const isEmailDuplicate = existingUsers.some((u: IUser) => u.email === email);
      const isNameDuplicate = existingUsers.some((u: IUser) => u.name === name);
      
      let message = "User already exists";
      if (isEmailDuplicate && isNameDuplicate) {
        message = "User with this email and name already exists";
      } else if (isEmailDuplicate) {
        message = "User with this email already exists";
      } else if (isNameDuplicate) {
        message = "User with this name already exists";
      }

      return res.status(409).json({
        success: false,
        message
      });
    }

    const result = await userService.createUsersIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "user create success",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "users list",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserByIdFromDB(req.params.id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUserInDB(id as string, req.body);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response)=> {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserFromDB(id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const userController = { 
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
