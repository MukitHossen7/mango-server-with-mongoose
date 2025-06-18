import { model, Schema } from "mongoose";
import { IMango } from "./mango.interface";

const mangoSchema = new Schema<IMango>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    variety: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      enum: {
        values: ["kg", "pcs"],
        message: "{VALUE} is not a valid unit",
      },
      default: "kg",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock must be a non-negative number"],
    },
    origin: {
      type: String,
      trim: true,
    },
    season: {
      type: String,
      enum: {
        values: ["summer", "winter"],
        message: "{VALUE} is not a valid season",
      },
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Mango = model<IMango>("Mango", mangoSchema);
export default Mango;
