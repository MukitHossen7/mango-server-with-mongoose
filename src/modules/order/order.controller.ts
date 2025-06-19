import { Request, Response } from "express";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const order = await Order.create(payload);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create orders",
      error,
    });
  }
};

export const orderController = {
  createOrder,
};
