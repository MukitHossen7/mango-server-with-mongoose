import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import AppError from "../error/AppError";
import config from "../config";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user.model";
export const checkAuth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(httpStatus.FORBIDDEN, "Access token is missing");
      }
      const verify_token = verifyToken(
        accessToken,
        config.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!verify_token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid access token");
      }

      const isUserExist = await User.findOne({ email: verify_token.email });
      if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      if (!roles.includes(isUserExist.role as string)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You do not have permission to access this resource"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
