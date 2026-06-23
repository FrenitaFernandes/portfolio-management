import { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("Email from request:", email);
    console.log("Database Name:", User.db.name);

    const user = await User.findOne({ email });

    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email',
      });
    }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
  return res.status(401).json({
    message: "Invalid password",
    });
  }
   
  const token = jwt.sign(
  {
    userId: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET as string,
  {
    expiresIn: "7d",
  }
);

  res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: 'Server error',
  });
}
};