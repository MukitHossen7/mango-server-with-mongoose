import config from "../../config";
import AppError from "../../error/AppError";
import { createUserToken } from "../../utils/userToken";
import { IUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";

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

const getUsersFromDB = async () => {
  const users = await User.find();
  return users;
};

const logInUser = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExist.password
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid password");
  }

  const userToken = createUserToken(isUserExist);
  const { password: pass, ...userData } = isUserExist.toObject();

  return {
    accessToken: userToken.accessToken,
    userData,
  };
};

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  logInUser,
};
