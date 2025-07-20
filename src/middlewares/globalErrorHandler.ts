import { NextFunction, Request, Response } from "express";
import config from "../config";
import AppError from "../error/AppError";
import { any, ZodError } from "zod";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong!!";
  let errorSources: any[] = [];

  if (error.code === 11000) {
    const duplicate = error.message.match(/"([^"]*)"/)[1];
    message = `${duplicate} is already exists`;
  } else if (error.name === "CastError") {
    message = "Invalid Mongodb ObjectId";
  } else if (error.name === "ValidationError") {
    const errors = Object.values(error.errors);
    errors.forEach((err: any) => {
      errorSources.push({
        path: err.path,
        message: err.message,
      });
    });
  } else if (error instanceof ZodError) {
    error.issues.forEach((issue) => {
      errorSources.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });
  }

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = message || error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = message || error.message;
  }
  console.log(message);
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: error,
    error: errorSources,
    stack: config.node_env === "development" ? error.stack : null,
  });
};
