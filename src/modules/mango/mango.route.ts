import express from "express";
import { createMango } from "./mango.controller";

const mangoRoute = express.Router();

mangoRoute.post("/", createMango);

export default mangoRoute;
