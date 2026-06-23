import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import uploadResume from "../middleware/uploadResume.js";

import {
  uploadResume as uploadResumeController,
  getResume,
  deleteResume,
} from "../controllers/resumeController.js";

const router = Router();

router.get("/", getResume);

router.post(
  "/upload",
  authMiddleware,
  uploadResume.single("resume"),
  uploadResumeController
);

router.delete(
  "/",
  authMiddleware,
  deleteResume
);

export default router;