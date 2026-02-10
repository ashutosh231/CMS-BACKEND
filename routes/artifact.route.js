import express from "express";
import { createArtifact, getArtifacts } from "../controllers/artifact.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Create a new artifact (Admin only)
router.post("/", authMiddleware, authorizeRoles("ADMIN"), createArtifact);

// Get all artifacts (Admin, Editor, and Viewer)
router.get("/", authMiddleware, authorizeRoles("ADMIN", "EDITOR", "VIEWER"), getArtifacts);

export default router;