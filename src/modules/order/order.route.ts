import express from "express";
import { orderController } from "./order.controller";

const orderRoute = express.Router();

orderRoute.post("/", orderController.createOrder);

export default orderRoute;
