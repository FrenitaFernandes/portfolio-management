import { Schema, model } from "mongoose";

const resumeSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Resume", resumeSchema);