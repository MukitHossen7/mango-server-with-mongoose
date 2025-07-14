import { Request, Response } from "express";
import User from "./user.model";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await userService.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(201).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve users",
      error,
    });
  }
};

export const userController = {
  createUser,
  getUsers,
};
