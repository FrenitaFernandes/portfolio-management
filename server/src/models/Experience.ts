import { Schema, model } from "mongoose";

const experienceSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model(
  "Experience",
  experienceSchema
);