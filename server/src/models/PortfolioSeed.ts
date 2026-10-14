import { Schema, model } from "mongoose";

const portfolioSeedSchema = new Schema(
  {
    version: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("PortfolioSeed", portfolioSeedSchema);
