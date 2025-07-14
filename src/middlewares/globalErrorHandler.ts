import { NextFunction, Request, Response } from "express";
import config from "../config";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: config.node_env === "development" ? error.stack : null,
  });
};
