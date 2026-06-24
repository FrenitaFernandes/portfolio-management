import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = Router();

router.get("/", getProfile);

router.put(
  "/",
  authMiddleware,
  updateProfile
);

export default router;