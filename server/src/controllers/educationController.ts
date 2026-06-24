import { Request, Response } from "express";
import Education from "../models/Education.js";

export const createEducation = async (
  req: Request,
  res: Response
) => {
  try {
    const education =
      await Education.create(req.body);

    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create education",
    });
  }
};

export const getEducations = async (
  req: Request,
  res: Response
) => {
  try {
    const educations =
      await Education.find();

    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch education",
    });
  }
};

export const updateEducation = async (
  req: Request,
  res: Response
) => {
  try {
    const education =
      await Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update education",
    });
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response
) => {
  try {
    await Education.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Education deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete education",
    });
  }
};