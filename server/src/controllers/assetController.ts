import { Request, Response } from "express";
import Asset from "../models/Asset.js";

export const getAsset = async (req: Request, res: Response) => {
  const asset = await Asset.findOne({ key: req.params.key });

  if (!asset) {
    res.status(404).json({ message: "Asset not found" });
    return;
  }

  res.type(asset.contentType);
  res.setHeader("Content-Disposition", `inline; filename="${asset.fileName.replace(/["\r\n]/g, "")}"`);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.send(asset.data);
};
