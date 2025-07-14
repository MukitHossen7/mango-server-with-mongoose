import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

export const app = express();

//middleware
app.use([cors(), express.urlencoded({ extended: true }), express.json()]);

//routes
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is out mongo server",
  });
});

app.use(globalErrorHandler);
