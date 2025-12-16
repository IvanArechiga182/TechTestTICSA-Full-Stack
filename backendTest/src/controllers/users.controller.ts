import { json, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Login } from "../models/Login";
import { pool } from "../config/database";
import { RowDataPacket } from "mysql2";
import { GenerateJWT } from "../services/GenerateJwtService";
import { LoginResponse } from "../interfaces/LoginResponse";
import { LoginRequest } from "../interfaces/LoginRequest";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password }: LoginRequest = req.body;

  if (!username || !password) {
    const response: LoginResponse = {
      status: 400,
      message: "Invalid request.",
      token: "",
    };
    return res.status(response.status).send(response);
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (!rows.length) {
      const response: LoginResponse = {
        status: 404,
        message: "User does not exists",
        token: "",
      };
      return res.status(response.status).send(response);
    }

    const users = rows as Login[];

    const valid = await bcrypt.compare(password.toString(), users[0].password);

    if (!valid) {
      const response: LoginResponse = {
        status: 401,
        message: "User credentials are invalid.",
        token: "",
      };
      return res.status(response.status).send(response);
    }

    const token = GenerateJWT({ id: users[0].id });

    const response: LoginResponse = {
      status: 200,
      message: "User was successfully logged in",
      token,
    };

    return res.status(response.status).send(response);
  } catch (err) {
    console.log(err);
    const response: LoginResponse = {
      status: 500,
      message: "Internal server error",
      token: "",
    };

    return res.status(response.status).send(response);
  }
};
