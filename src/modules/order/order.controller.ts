import { Request, Response } from "express";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { mango, quantity } = payload;
    if (!mango || !quantity) {
      return res.status(400).json({
        success: false,
        message: "mango and quantity field need",
      });
    }
    const isStock = await Order.checkStock(req.body.mango, req.body.quantity);
    if (!isStock) {
      return res.status(400).json({
        success: false,
        message: "Stock is not available",
      });
    }
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

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(201).json({
      success: true,
      message: "Order retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieved orders",
      error,
    });
  }
};

export const orderController = {
  createOrder,
  getOrders,
};
