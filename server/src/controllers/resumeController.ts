import { Request, Response } from "express";
import Asset from "../models/Asset.js";
import Resume from "../models/Resume.js";

export const getResume = async (
  req: Request,
  res: Response
) => {
  try {
    const resume =
      await Resume.findOne();

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed",
    });
  }
};