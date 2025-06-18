import express from "express";
import { mangoController } from "./mango.controller";

const mangoRoute = express.Router();

mangoRoute.post("/", mangoController.createMango);
mangoRoute.get("/", mangoController.getMangos);
mangoRoute.get("/:id", mangoController.getMangoById);
mangoRoute.patch("/:id", mangoController.updateMangoById);
mangoRoute.delete("/:id", mangoController.deleteMangoById);

export default mangoRoute;
