import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import uploadImage from "../middleware/uploadImage.js";

import {
  uploadImageController,
  deleteImageController,
} from "../controllers/uploadController.js";

const router = Router();

router.post(
  "/image",
  authMiddleware,
  uploadImage.single("image"),
  uploadImageController
);

router.delete(
  "/image/:fileName",
  authMiddleware,
  deleteImageController
);

export default router;