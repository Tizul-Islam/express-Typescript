import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const userIdNum = Number(user_id);
    if (!user_id || Number.isNaN(userIdNum)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing user_id param" });
    }

    const payload = { ...req.body, user_id: userIdNum };

    const result = await profileService.createProfileIntoDB(payload);
    res.status(201).json({
      success: true,
      message: "Profile created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getProfiles = async (req: Request, res: Response) => {
  try {
    const result = await profileService.getAllProfilesFromDB();
    res.status(200).json({
      success: true,
      message: "Profiles retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (!id || Number.isNaN(idNum)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing id param",
      });
    }

    const result = await profileService.getProfileByIdFromDB(idNum);
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (!id || Number.isNaN(idNum)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing id param",
      });
    }

    const result = await profileService.updateProfileIntoDB(idNum, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);
    if (!id || Number.isNaN(idNum)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing id param",
      });
    }

    const result = await profileService.deleteProfileFromDB(idNum);
    res.status(200).json({
      success: true,
      message: "Profile deleted successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
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
