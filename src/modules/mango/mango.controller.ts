import { Request, Response } from "express";
import Mango from "./mango.model";

export const createMango = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const mango = new Mango(payload);
    const savedMango = await mango.save();
    res.status(201).json({
      status: "success",
      message: "Mango created successfully",
      data: savedMango,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
