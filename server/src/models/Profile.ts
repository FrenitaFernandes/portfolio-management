import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    profileImage: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Profile", profileSchema);