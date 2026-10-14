import { Request, Response } from "express";
import Contact from "../models/Contact.js";

export const createContact = async (
  req: Request,
  res: Response
) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({
      message: "Message saved successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};