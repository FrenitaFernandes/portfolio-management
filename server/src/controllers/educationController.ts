import { Request, Response } from "express";
import Education from "../models/Education.js";

export const getEducations = async (
  _req: Request,
  res: Response,
) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch {
    res.status(500).json({
      message: "Failed to fetch education",
    });
  }
};
