import { Request, Response } from "express";
import Contact from "../models/Contact.js";

export const createContact = async (
  req: Request,
  res: Response
) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

export const getContacts = async (
  req: Request,
  res: Response
) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

export const deleteContact = async (
  req: Request,
  res: Response
) => {
  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id
    );

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};