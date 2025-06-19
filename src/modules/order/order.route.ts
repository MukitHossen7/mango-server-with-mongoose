import express from "express";
import { orderController } from "./order.controller";

const orderRoute = express.Router();

orderRoute.post("/", orderController.createOrder);
orderRoute.get("/", orderController.getOrders);

export default orderRoute;
