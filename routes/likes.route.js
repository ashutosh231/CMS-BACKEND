import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { toggleLike } from "../controllers/likes.controller.js";

const router = express.Router();

// Like an artifact (Admin, Editor, and Viewer)
router.post("/:artifactId/like", authMiddleware, authorizeRoles("ADMIN", "EDITOR", "VIEWER"), toggleLike);

// Unlike an artifact (Admin, Editor, and Viewer)
router.post("/:artifactId/unlike", authMiddleware, authorizeRoles("ADMIN", "EDITOR", "VIEWER"), toggleLike);

export default router;