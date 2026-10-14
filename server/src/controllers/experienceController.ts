import { Request, Response } from "express";
import Experience from "../models/Experience.js";

export const getExperiences = async (
  _req: Request,
  res: Response,
) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch {
    res.status(500).json({
      message: "Failed to fetch experiences",
    });
  }
};
