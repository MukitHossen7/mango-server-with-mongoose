import { Router } from "express";
import userRoute from "../modules/user/user.route";
import mangoRoute from "../modules/mango/mango.route";

const routes = Router();

routes.use("/user", userRoute);
routes.use("/mango", mangoRoute);

export default routes;
