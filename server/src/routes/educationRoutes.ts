import { Router } from "express";

import { getEducations } from "../controllers/educationController.js";

const router = Router();

router.get("/", getEducations);

export default router;