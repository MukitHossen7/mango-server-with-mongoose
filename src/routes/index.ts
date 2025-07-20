import { Router } from "express";
import userRoute from "../modules/user/user.route";
import mangoRoute from "../modules/mango/mango.route";
import orderRoute from "../modules/order/order.route";
import authRoute from "../modules/auth/auth.route";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/mango", mangoRoute);
routes.use("/order", orderRoute);
routes.use("/auth", authRoute);

export default routes;
