import type { Request, Response } from "express";
import { profileService } from "./profile.service";
import sendResponse from "../../utility/sendResponse";

const createProfile = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "user_id is required",
      });
    }

    const result = await profileService.createProfileIntoDB(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Profile created successfully!",
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

const getProfiles = async (req: Request, res: Response) => {
  try {
    const result = await profileService.getAllProfilesFromDB();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profiles retrieved successfully!",
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

const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await profileService.getProfileByIdFromDB(Number(id));
    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Profile not found!",
        data: {},
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile retrieved successfully!",
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

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await profileService.updateProfileIntoDB(Number(id), req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully!",
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

const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await profileService.deleteProfileFromDB(Number(id));
    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Profile not found!",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile deleted successfully!",
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

export const profileController = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
