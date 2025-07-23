import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

export const queryBuilders =
  (model: Model<any>, searchAbleFields: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = { ...req.query };
      // console.log(query);
      const filter = { ...query };
      const search = query.search || "";
      const sort = query.sort || "-createdAt";

      const excludeField = ["search", "sort", "fields", "page", "limit"];
      for (const field of excludeField) {
        delete filter[field];
      }

      // this is optional use koral filter korar somoy fixsiable hoba na use kora valo

      //   for (const key in filter) {
      //     const value = filter[key];
      //     if (typeof value === "string") {
      //       filter[key] = { $regex: value, $options: "i" };
      //     }
      //   }
      // console.log(searchAbleFields, search);

      const searchQuery = {
        $or: searchAbleFields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      };
      const mango = await model
        .find(filter)
        .find(searchQuery)
        .sort(sort as string);
      console.log(mango);
      next();
    } catch (error) {
      next(error);
    }
  };
