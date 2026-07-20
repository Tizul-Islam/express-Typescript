import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payload: IProfile) => {
  const { user_id, bio, address, phone, gender } = payload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [user_id],
  );

  if (user.rows.length === 0) {
    throw new Error("User not exists!");
  }

  const result = await pool.query(
    `
    INSERT INTO profiles(user_id, bio, address, phone, gender) 
    VALUES($1, $2, $3, $4, $5) 
    RETURNING *
    `,
    [user_id, bio, address, phone, gender],
  );
  return result;
};

const getAllProfilesFromDB = async () => {
  const result = await pool.query(`SELECT * FROM profiles`);
  return result;
};

const getProfileByIdFromDB = async (id: number) => {
  const result = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id]);
  return result;
};

const updateProfileIntoDB = async (id: number, payload: Partial<IProfile>) => {
  const profile = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id]);
  if (profile.rows.length === 0) {
    throw new Error("Profile not found!");
  }

  const { bio, gender, address, phone } = payload;
  const result = await pool.query(
    `
    UPDATE profiles 
    SET 
      bio = COALESCE($1, bio), 
      gender = COALESCE($2, gender), 
      address = COALESCE($3, address), 
      phone = COALESCE($4, phone) 
    WHERE id = $5 
    RETURNING *
    `,
    [bio, gender, address, phone, id],
  );
  return result;
};

const deleteProfileFromDB = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM profiles WHERE id=$1 RETURNING *
    `,
    [id],
  );
  return result;
};

export const profileService = {
  createProfileIntoDB,
  getAllProfilesFromDB,
  getProfileByIdFromDB,
  updateProfileIntoDB,
  deleteProfileFromDB,
};
