import { Request, Response } from "express";
import Project from "../models/Project.js";

export const getProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};