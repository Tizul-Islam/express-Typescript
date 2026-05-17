import { pool } from "../../db";

const createProfileIntoDB = async (payload: any) => {
  const { user_id, bio, gender, address, phone } = payload;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [user_id],
  );
  //   console.log(user);
  if (user.rows.length === 0) {
    throw new Error("User not exists!");
  }

  const result = await pool.query(
    `
   INSERT INTO profiles (user_id, bio, gender, address, phone) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [user_id, bio, gender, address, phone],
  );
  return result;
};

const getAllProfilesFromDB = async () => {
  const result = await pool.query(`SELECT * FROM profiles`);
  return result;
};

const getProfileByIdFromDB = async (id: number) => {
  const result = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id]);
  if (result.rows.length === 0) {
    throw new Error("Profile not found!");
  }
  return result;
};

const updateProfileIntoDB = async (id: number, payload: any) => {
  const profile = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id]);
  if (profile.rows.length === 0) {
    throw new Error("Profile not found!");
  }

  const { bio, gender, address, phone } = payload;
  const result = await pool.query(
    `UPDATE profiles SET bio=$1, gender=$2, address=$3, phone=$4 WHERE id=$5 RETURNING *`,
    [bio, gender, address, phone, id],
  );
  return result;
};

const deleteProfileFromDB = async (id: number) => {
  const profile = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id]);
  if (profile.rows.length === 0) {
    throw new Error("Profile not found!");
  }

  const result = await pool.query(
    `DELETE FROM profiles WHERE id=$1 RETURNING *`,
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
