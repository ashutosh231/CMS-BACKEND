import express from "express";
import {getChatsByThread,sendChat} from "../controllers/chats.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router=express.Router();


/**
 * @openapi
 * /chats/{threadId}:
 *   get:
 *     summary: Get chats by thread
 *     tags:
 *       - Chats
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of chats
 */
router.get("/:threadId",authMiddleware,getChatsByThread);

/**
 * @openapi
 * /chats:
 *   post:
 *     summary: Send a chat message
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               threadId:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chat sent
 */
router.post("/",authMiddleware,sendChat);

export default router;