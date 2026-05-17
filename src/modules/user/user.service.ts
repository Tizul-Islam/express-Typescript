import { pool } from "../../db";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const createUsersIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, hashPassword, age],
  );

delete result.rows[0].password; 

  return result;
};

const checkDuplicateUser = async (email: string, name: string) => {
  const result = await pool.query(
    `SELECT email, name FROM users WHERE email = $1 OR name = $2`,
    [email, name],
  );
  return result.rows;
};

const getUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getUserByIdFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUserInDB = async (id: string, payLoad: IUser) => {
  const { name, email, password, age, is_active } = payLoad;
  const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const result = await pool.query(
    `
      UPDATE users
      SET
        name = COALESCE($2, name),
        email = COALESCE($3, email),
        password = COALESCE($4, password),
        age = COALESCE($5, age),
        is_active = COALESCE($6, is_active),
        updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `,
    [id, name, email, hashPassword ?? password, age, is_active],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id = $1 RETURNING *`,
    [id],
  );
  return result;
};

export const userService = {
  createUsersIntoDB,
  checkDuplicateUser,
  getUsersFromDB,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
