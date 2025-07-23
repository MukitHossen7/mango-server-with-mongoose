import { NextFunction, Request, Response } from "express";

export const queryBuilders =
  (model) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = { ...req.query };
      const filter = query;
      console.log(filter);
      const excludeField = ["search", "sort", "fields", "page", "limit"];
      for (const field of excludeField) {
        delete filter[field];
      }
      console.log(filter);
      const mango = await model.find(filter);
      console.log(mango);
      next();
    } catch (error) {
      next(error);
    }
  };
