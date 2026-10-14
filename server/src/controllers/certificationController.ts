import { Request, Response } from "express";
import Certification from "../models/Certification.js";

export const getCertifications = async (
  _req: Request,
  res: Response,
) => {
  try {
    const certifications = await Certification.find();
    res.status(200).json(certifications);
  } catch {
    res.status(500).json({
      message: "Failed to fetch certifications",
    });
  }
};
