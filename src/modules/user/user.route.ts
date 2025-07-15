import express from "express";
import { userController } from "./user.controller";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import { createUserZodSchema } from "./user.zod.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const userRoute = express.Router();

userRoute.post(
  "/",
  zodValidateRequest(createUserZodSchema),
  userController.createUser
);
userRoute.post("/login", userController.logInUser);
userRoute.get("/", checkAuth(Role.ADMIN), userController.getUsers);

export default userRoute;
