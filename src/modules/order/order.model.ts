import { model, Schema } from "mongoose";
import { IAddress, IOrder, OrderMethods } from "./order.interface";
import Mango from "../mango/mango.model";

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

const orderSchema = new Schema<IOrder, OrderMethods>(
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
      min: 0,
    },
    totalPrice: {
      type: Number,
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

orderSchema.pre("save", async function () {
  const mango = await Mango.findById(this.mango);
  if (!mango) throw new Error("Mango not find");
  this.totalPrice = mango.price * this.quantity;
});

orderSchema.static("checkStock", async function stockCheck(id, quantity) {
  const mangoStock = await Mango.findById(id);
  if (mangoStock?.stock) {
    const result = mangoStock?.stock >= quantity;
    return result;
  }
});
const Order = model<IOrder, OrderMethods>("Order", orderSchema);
export default Order;
