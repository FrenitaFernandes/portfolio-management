import { Router } from "express";

import { getResume } from "../controllers/resumeController.js";

const router = Router();

router.get("/", getResume);

export default router;