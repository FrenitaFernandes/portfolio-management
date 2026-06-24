import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

const router = Router();

router.get("/", getEducations);

router.post(
  "/",
  authMiddleware,
  createEducation
);

router.put(
  "/:id",
  authMiddleware,
  updateEducation
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEducation
);

export default router;