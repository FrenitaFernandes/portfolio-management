import { Router } from "express";
import { getSkills } from "../controllers/skillController.js";

const router = Router();

// Public Route
router.get("/", getSkills);

export default router;