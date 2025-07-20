import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import AppError from "../error/AppError";
import httpStatus from "http-status-codes";

export const createUserToken = (user: Partial<IUser>) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    payload,
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRATION
  );
  const refreshToken = generateToken(
    payload,
    config.JWT_REFRESH_SECRET,
    config.JWT_REFRESH_EXPIRATION
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    config.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
  }
  const tokenPayload = {
    email: isUserExist.email,
    role: isUserExist.role,
    id: isUserExist._id,
  };

  const accessToken = generateToken(
    tokenPayload,
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRATION
  );

  return {
    accessToken,
  };
};
