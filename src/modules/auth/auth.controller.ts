import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const userRes = await authServices.changePasswordFromDB(
    oldPassword,
    newPassword
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Change Password successfully",
    data: userRes,
  });
});

export const authController = {
  changePassword,
};
