import { Router } from "express";

import { getCertifications } from "../controllers/certificationController.js";

const router = Router();

router.get("/", getCertifications);

export default router;