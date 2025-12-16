import { loginUser } from "../controllers/users.controller";
import { Router } from "express";
const usersRoutes = Router();
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user and get its JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *           example:
 *             username: testuser1
 *             password: 123456789123456
 *     responses:
 *       200:
 *         description: User loggged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *             example:
 *               status: 200
 *               message: User logged in successfully
 *               token: 13812938123981293819238193888412ajsdkasjd13123gaskdjaskjh1231
 *       400:
 *         description: Invalid request was sended
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *             example:
 *               status: 400
 *               message: Invalid request
 *               token: ""
 *       401:
 *         description: Invalid user credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *             example:
 *               status: 401
 *               message: User credentials are invalid.
 *               token: ""
 *       404:
 *         description: User does not exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *             example:
 *               status: 400
 *               message: User was not found.
 *               token: ""
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginUserResponse'
 *             example:
 *               status: 500
 *               message: Internal server error
 *               token: ""
 */
usersRoutes.post("/login", loginUser);

export default usersRoutes;
