import { Router } from "express";

import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.post("/", createContact);

// Admin
router.get("/", authMiddleware, getContacts);

// Admin
router.delete("/:id", authMiddleware, deleteContact);

export default router;