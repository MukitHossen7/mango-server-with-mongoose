import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

const User = model<IUser>("User", userSchema);
export default User;
