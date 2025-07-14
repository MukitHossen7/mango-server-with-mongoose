import express from "express";
import { userController } from "./user.controller";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import { createUserZodSchema } from "./user.zod.validation";

const userRoute = express.Router();

userRoute.post(
  "/",
  zodValidateRequest(createUserZodSchema),
  userController.createUser
);
userRoute.get("/", userController.getUsers);

export default userRoute;
