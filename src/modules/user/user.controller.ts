import { Request, Response } from "express";
import User from "./user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = new User(payload);
    const data = await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
    console.error("Error creating user:", error);
  }
};
