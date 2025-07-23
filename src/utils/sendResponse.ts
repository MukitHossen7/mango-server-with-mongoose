import { Response } from "express";

interface IMeta {
  page?: number;
  limit?: number;
  totalPage?: number;
  total?: number;
}

interface IResponseData<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  meta?: IMeta;
}

export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
