import { Request, Response } from "express";
import Certification from "../models/Certification.js";

export const createCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const certification = await Certification.create(req.body);

    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create certification",
    });
  }
};

export const getCertifications = async (
  req: Request,
  res: Response
) => {
  try {
    const certifications = await Certification.find();

    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch certifications",
    });
  }
};

export const updateCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const certification =
      await Certification.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!certification) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    res.status(200).json(certification);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update certification",
    });
  }
};

export const deleteCertification = async (
  req: Request,
  res: Response
) => {
  try {
    const certification =
      await Certification.findByIdAndDelete(
        req.params.id
      );

    if (!certification) {
      return res.status(404).json({
        message: "Certification not found",
      });
    }

    res.status(200).json({
      message: "Certification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete certification",
    });
  }
};