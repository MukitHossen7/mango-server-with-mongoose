import { Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({});
