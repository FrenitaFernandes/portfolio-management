import { Router } from "express";
import { getAsset } from "../controllers/assetController.js";

const router = Router();

router.get("/:key", getAsset);

export default router;
