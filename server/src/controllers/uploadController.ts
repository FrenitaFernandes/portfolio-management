import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const uploadImageController = (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.status(200).json({
      fileName: req.file.filename,
      imageUrl: `/uploads/images/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
    });
  }
};

export const deleteImageController = (
  req: Request,
  res: Response
) => {
  try {
    const fileName = req.params.fileName as string;

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      "images",
      fileName
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);

      return res.status(200).json({
        message: "Image deleted successfully",
      });
    }

    return res.status(404).json({
      message: "Image not found",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete failed",
    });
  }
};