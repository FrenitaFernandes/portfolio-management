import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = Router();

router.get("/", getExperiences);

router.post(
  "/",
  authMiddleware,
  createExperience
);

router.put(
  "/:id",
  authMiddleware,
  updateExperience
);

router.delete(
  "/:id",
  authMiddleware,
  deleteExperience
);

export default router;