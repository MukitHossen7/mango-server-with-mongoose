import express, { Request, Response } from "express";
import cors from "cors";
import userRoute from "./modules/user/user.route";

export const app = express();

//middleware
app.use([cors(), express.urlencoded({ extended: true }), express.json()]);

//routes
app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is out mongo server",
  });
});
