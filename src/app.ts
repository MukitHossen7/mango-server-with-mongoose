import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

export const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
//routes
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is out mongo server",
  });
});

app.use(globalErrorHandler);
