import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (input: string) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "customer"],
        message: "{VALUE} is not a valid role",
      },
      default: "customer",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model<IUser>("User", userSchema);
export default User;
