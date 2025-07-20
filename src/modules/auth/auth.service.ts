import AppError from "../../error/AppError";
import User from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import config from "../../config";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userToken";

const changePasswordFromDB = async (
  oldPassword: string,
  newPassword: string,
  email: string
) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const checkPassword = await bcrypt.compare(oldPassword, isUserExist.password);
  if (!checkPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }
  isUserExist.password = await bcrypt.hash(
    newPassword,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  isUserExist.save();
};

//Reset password
const resetPasswordFromDB = async (
  password: string,
  phone: string,
  email: string
) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const checkPhone = isUserExist.phone === phone;
  if (!checkPhone) {
    throw new AppError(httpStatus.BAD_REQUEST, "Phone number is incorrect");
  }

  isUserExist.password = await bcrypt.hash(
    password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  isUserExist.save();
};

const createNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken.accessToken,
  };
};
export const authServices = {
  changePasswordFromDB,
  resetPasswordFromDB,
  createNewAccessToken,
};
