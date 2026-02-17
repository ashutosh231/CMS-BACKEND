import express from "express";
import {
  initiateSignup,
  verifySignupOtp,
  login
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * SIGNUP FLOW
 */


/**
 * @openapi
 * /auth/signup/initiate:
 *   post:
 *     summary: Initiate signup (generate OTP)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
router.post("/signup/initiate", initiateSignup);

/**
 * @openapi
 * /auth/signup/verify:
 *   post:
 *     summary: Verify OTP and create user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/signup/verify", verifySignupOtp);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

export default router;