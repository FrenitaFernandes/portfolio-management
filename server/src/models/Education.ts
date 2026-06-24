import { Schema, model } from "mongoose";

const educationSchema = new Schema(
  {
    degree: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    cgpa: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model(
  "Education",
  educationSchema
);