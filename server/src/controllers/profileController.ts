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

export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    let profile = await Profile.findOne();

    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        {
          new: true,
        }
      );
    } else {
      profile = await Profile.create(
        req.body
      );
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Failed to save profile",
    });
  }
};