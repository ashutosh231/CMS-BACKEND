import express from "express";
import { createArtifact, getArtifacts } from "../controllers/artifact.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {upload} from "../middleware/uploads.middleware.js";

const router = express.Router();

// Create a new artifact (Admin and Editor only)
router.post("/", authMiddleware,upload.single("file"), authorizeRoles("ADMIN","EDITOR"), createArtifact);

// Get all artifacts (Admin, Editor, and Viewer)
router.get("/", authMiddleware, authorizeRoles("ADMIN", "VIEWER"), getArtifacts);

export default router;