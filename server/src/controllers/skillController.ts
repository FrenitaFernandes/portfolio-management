import { Request, Response } from "express";
import Skill from "../models/Skill.js";

export const getSkills = async (
  req: Request,
  res: Response
) => {
  try {
    const skills = await Skill.find();

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch skills",
    });
  }
};