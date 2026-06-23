import { Router } from "express";

import {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", getCertifications);

router.post(
  "/",
  authMiddleware,
  createCertification
);

router.put(
  "/:id",
  authMiddleware,
  updateCertification
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCertification
);

export default router;