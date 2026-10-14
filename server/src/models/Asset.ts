import { Schema, model } from "mongoose";

const assetSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    contentType: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true },
);

export default model("Asset", assetSchema);
