import { Response } from "express";

interface IResponseData<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
