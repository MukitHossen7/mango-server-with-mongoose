import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../error/AppError";

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

export const authController = {
  changePassword,
  resetPassword,
};
