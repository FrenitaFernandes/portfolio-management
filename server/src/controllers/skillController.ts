import { Request, Response } from "express";
import Skill from "../models/Skill.js";

export const createSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create skill",
    });
  }
};


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

export const updateSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update skill",
    });
  }
};
export const deleteSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const skill = await Skill.findByIdAndDelete(
      req.params.id
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete skill",
    });
  }
};