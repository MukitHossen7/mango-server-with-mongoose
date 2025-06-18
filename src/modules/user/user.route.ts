import express from "express";
import { createUser, getUsers } from "./user.controller";

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.get("/", getUsers);

export default userRoute;
