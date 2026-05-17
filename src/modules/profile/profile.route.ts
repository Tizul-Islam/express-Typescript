import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

// Get all profiles
router.get("/", profileController.getProfiles);

// Create profile for a user
router.post("/user/:user_id", profileController.createProfile);

// Get profile by ID
router.get("/:id", profileController.getProfileById);

// Update profile by ID
router.put("/:id", profileController.updateProfile);

// Delete profile by ID
router.delete("/:id", profileController.deleteProfile);

export const profileRoutes = router;
