import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { toggleLike } from "../controllers/likes.controller.js";

const router = express.Router();


/**
 * @openapi
 * /likes/{artifactId}/like:
 *   post:
 *     summary: Like an artifact
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: artifactId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artifact liked
 */
router.post("/:artifactId/like", authMiddleware, authorizeRoles("ADMIN", "EDITOR", "VIEWER"), toggleLike);

/**
 * @openapi
 * /likes/{artifactId}/unlike:
 *   post:
 *     summary: Unlike an artifact
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: artifactId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Artifact unliked
 */
router.post("/:artifactId/unlike", authMiddleware, authorizeRoles("ADMIN", "EDITOR", "VIEWER"), toggleLike);

export default router;