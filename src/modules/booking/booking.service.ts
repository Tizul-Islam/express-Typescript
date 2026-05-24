import { pool } from "../../db";
import type { IBooking } from "./booking.interface";

const createBookingIntoDB = async (payload: IBooking, loggedInUser: { id: number; role: string }) => {
  const { user_id, title, description, booking_date } = payload;

  // If role is user, force they can only book for themselves
  const finalUserId = loggedInUser.role === "user" ? loggedInUser.id : (user_id || loggedInUser.id);

  // Check if target user exists
  const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [finalUserId]);
  if (userCheck.rows.length === 0) {
    throw new Error("User does not exist!");
  }

  const result = await pool.query(
    `
    INSERT INTO bookings(user_id, title, description, booking_date)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
    [finalUserId, title, description, booking_date],
  );
  return result;
};

const getAllBookingsFromDB = async (loggedInUser: { id: number; role: string }) => {
  if (loggedInUser.role === "admin" || loggedInUser.role === "agent") {
    // Admins and agents retrieve all bookings
    const result = await pool.query(`
      SELECT b.*, u.name as user_name, u.email as user_email 
      FROM bookings b 
      JOIN users u ON b.user_id = u.id
      ORDER BY b.booking_date DESC
    `);
    return result;
  } else {
    // Normal users retrieve only their own bookings
    const result = await pool.query(
      `
      SELECT b.*, u.name as user_name, u.email as user_email 
      FROM bookings b 
      JOIN users u ON b.user_id = u.id
      WHERE b.user_id = $1
      ORDER BY b.booking_date DESC
      `,
      [loggedInUser.id],
    );
    return result;
  }
};

const getSingleBookingFromDB = async (id: number, loggedInUser: { id: number; role: string }) => {
  const result = await pool.query(
    `
    SELECT b.*, u.name as user_name, u.email as user_email 
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    WHERE b.id = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("Booking not found!");
  }

  const booking = result.rows[0];

  // Enforce ownership check for user role
  if (loggedInUser.role === "user" && booking.user_id !== loggedInUser.id) {
    throw new Error("Unauthorized access to this booking!");
  }

  return result;
};

const updateBookingIntoDB = async (
  id: number,
  payload: Partial<IBooking>,
  loggedInUser: { id: number; role: string },
) => {
  const bookingCheck = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
  if (bookingCheck.rows.length === 0) {
    throw new Error("Booking not found!");
  }

  const booking = bookingCheck.rows[0];

  // Enforce ownership check for user role
  if (loggedInUser.role === "user" && booking.user_id !== loggedInUser.id) {
    throw new Error("Unauthorized access to this booking!");
  }

  const { title, description, booking_date, status } = payload;

  // If user role, they cannot force status update to confirmed unless allowed.
  // But let's allow them to update description/title/date or cancel it.
  const finalStatus = loggedInUser.role === "user" && status && status !== "cancelled" ? booking.status : (status || booking.status);

  const result = await pool.query(
    `
    UPDATE bookings 
    SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      booking_date = COALESCE($3, booking_date),
      status = COALESCE($4, status),
      updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `,
    [title, description, booking_date, finalStatus, id],
  );

  return result;
};

const deleteBookingFromDB = async (id: number, loggedInUser: { id: number; role: string }) => {
  const bookingCheck = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
  if (bookingCheck.rows.length === 0) {
    throw new Error("Booking not found!");
  }

  const booking = bookingCheck.rows[0];

  // Enforce ownership check for user role
  if (loggedInUser.role === "user" && booking.user_id !== loggedInUser.id) {
    throw new Error("Unauthorized access to this booking!");
  }

  const result = await pool.query("DELETE FROM bookings WHERE id = $1 RETURNING *", [id]);
  return result;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
