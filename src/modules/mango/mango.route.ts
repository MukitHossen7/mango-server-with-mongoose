import express from "express";
import { mangoController } from "./mango.controller";

const mangoRoute = express.Router();

mangoRoute.post("/", mangoController.createMango);

export default mangoRoute;
