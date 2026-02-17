import express from "express";
import { createArtifact, getArtifacts } from "../controllers/artifact.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {upload} from "../middleware/uploads.middleware.js";
import { apiLimiter } from "../middleware/ratelimiter.middleware.js";
const router = express.Router();


/**
 * @openapi
 * /artifacts:
 *   post:
 *     summary: Create a new artifact
 *     tags:
 *       - Artifacts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artifact created
 */
router.post("/", authMiddleware,upload.single("image"), authorizeRoles("ADMIN","EDITOR","VIEWER"), createArtifact);

/**
 * @openapi
 * /artifacts:
 *   get:
 *     summary: Get all artifacts
 *     tags:
 *       - Artifacts
 *     responses:
 *       200:
 *         description: List of artifacts
 */
router.get("/",apiLimiter, authMiddleware, authorizeRoles("ADMIN", "VIEWER"), getArtifacts);

export default router;