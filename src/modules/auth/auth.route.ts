import express from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const authRoute = express.Router();

authRoute.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  authController.changePassword
);
authRoute.post("/reset-password", authController.resetPassword);

authRoute.post("/refresh-token", authController.createNewAccessToken);

authRoute.post("/log-out", authController.logOutUser);

export default authRoute;
