import express from "express";
import { userController } from "./user.controller";

const userRoute = express.Router();

userRoute.post("/", userController.createUser);
userRoute.get("/", userController.getUsers);

export default userRoute;
