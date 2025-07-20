import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import config from "../../config";

//change Password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const email = req.user.email;
  if (!email) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
  await authServices.changePasswordFromDB(oldPassword, newPassword, email);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Change Password successfully",
    data: null,
  });
});

//Reset password
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { password, phone, email } = req.body;
  await authServices.resetPasswordFromDB(password, phone, email);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Reset Password successfully",
    data: null,
  });
});

// create new access token
const createNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token is missing");
  }
  const accessTokenInfo = await authServices.createNewAccessToken(refreshToken);
  setAuthCookie(res, accessTokenInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Access Token Retrieved Successfully",
    data: accessTokenInfo,
  });
});

const logOutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.node_env !== "development",
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.node_env !== "development",
    sameSite: "lax",
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Log Out successfully",
    data: null,
  });
});
export const authController = {
  changePassword,
  resetPassword,
  createNewAccessToken,
  logOutUser,
};
