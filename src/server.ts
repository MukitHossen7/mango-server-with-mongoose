import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./modules/user/user.route";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is out mongo server",
  });
});

//server
const server = async () => {
  try {
    await mongoose.connect(config.database_url!);
    console.log("Database connected successfully");
    app.listen(config.port, () => {
      console.log(`Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
server();
