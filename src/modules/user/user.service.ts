import config from "../../config";
import { IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  // Hash the password before saving
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );

  const user = new User(payload);
  await User.syncIndexes();
  const data = await user.save();
  return data;
};

export const userService = {
  createUserIntoDB,
};
