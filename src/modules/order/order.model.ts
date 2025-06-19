import { model, Schema } from "mongoose";
import { IAddress, IOrder } from "./order.interface";

const addressSchema = new Schema<IAddress>(
  {
    zipcode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mango: {
      type: Schema.Types.ObjectId,
      ref: "Mango",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "process", "complete"],
        message: "{VALUE} is not a valid status",
      },
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
