/// <reference path="../../types/index.d.ts" />
import type { Request, Response } from "express";
import { bookingService } from "./booking.service";
import sendResponse from "../../utility/sendResponse";

const createBooking = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access!",
      });
    }

    const result = await bookingService.createBookingIntoDB(req.body, loggedInUser as any);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully!",
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

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access!",
      });
    }

    const result = await bookingService.getAllBookingsFromDB(loggedInUser as any);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings retrieved successfully!",
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

const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access!",
      });
    }

    const result = await bookingService.getSingleBookingFromDB(Number(id), loggedInUser as any);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking retrieved successfully!",
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

const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access!",
      });
    }

    const result = await bookingService.updateBookingIntoDB(Number(id), req.body, loggedInUser as any);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking updated successfully!",
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

const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized access!",
      });
    }

    await bookingService.deleteBookingFromDB(Number(id), loggedInUser as any);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking deleted successfully!",
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

export const bookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
