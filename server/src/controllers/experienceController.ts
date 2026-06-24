import { Request, Response } from "express";
import Experience from "../models/Experience.js";

export const createExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const experience =
      await Experience.create(req.body);

    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create experience",
    });
  }
};

export const getExperiences = async (
  req: Request,
  res: Response
) => {
  try {
    const experiences =
      await Experience.find();

    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch experiences",
    });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response
) => {
  try {
    const experience =
      await Experience.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update experience",
    });
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response
) => {
  try {
    await Experience.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete experience",
    });
  }
};