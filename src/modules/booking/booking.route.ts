import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";
import { bookingController } from "./booking.controller";

const router = Router();

// Secure bookings routes for admin, agent, and user roles
router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  bookingController.createBooking,
);

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  bookingController.getAllBookings,
);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  bookingController.getSingleBooking,
);

router.put(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  bookingController.updateBooking,
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  bookingController.deleteBooking,
);

export const bookingRoutes = router;
