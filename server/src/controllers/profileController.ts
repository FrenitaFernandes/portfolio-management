import { Request, Response } from "express";
import Profile from "../models/Profile.js";

export const getProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const profile = await Profile.findOne();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};