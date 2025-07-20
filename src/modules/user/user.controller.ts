import { Request, Response } from "express";
import User from "./user.model";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await userServices.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const logInUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const userInfo = await userServices.logInUser(payload);

  setAuthCookie(res, userInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User LogIn successfully",
    data: userInfo,
  });
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

export const userController = {
  createUser,
  getUsers,
  logInUser,
};
