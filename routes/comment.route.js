import express from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


/**
 * @openapi
 * /comments/{id}/comments:
 *   post:
 *     summary: Add a comment to an artifact
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 */
router.post("/:id/comments", authMiddleware, addComment);

/**
 * @openapi
 * /comments/{id}/comments:
 *   get:
 *     summary: Get comments for an artifact
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/:id/comments", getComments);

export default router;