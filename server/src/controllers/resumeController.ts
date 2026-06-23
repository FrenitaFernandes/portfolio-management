import { Request, Response } from "express";
import Resume from "../models/Resume.js";

export const uploadResume = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    await Resume.deleteMany();

    const resume =
      await Resume.create({
        fileName: req.file.filename,
        fileUrl:
          "/uploads/resumes/" +
          req.file.filename,
      });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
    });
  }
};

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

export const deleteResume = async (
  req: Request,
  res: Response
) => {
  try {
    await Resume.deleteMany();

    res.status(200).json({
      message:
        "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};