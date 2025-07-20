import AppError from "../../error/AppError";
import User from "../user/user.model";
import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";

const changePasswordFromDB = async (
  oldPassword: string,
  newPassword: string
) => {
  const isUserExist = await User.findOne({ oldPassword });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // const checkPassword = await bcrypt.compare()
};

export const authServices = {
  changePasswordFromDB,
};
