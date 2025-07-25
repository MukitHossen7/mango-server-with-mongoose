import express from "express";
import { mangoController } from "./mango.controller";
import { queryBuilders } from "../../middlewares/queryBuilders";
import Mango from "./mango.model";

const mangoRoute = express.Router();

mangoRoute.post("/", mangoController.createMango);
mangoRoute.get(
  "/",
  queryBuilders(Mango, ["name", "variety", "origin"]),
  mangoController.getMangos
);
mangoRoute.get("/:id", mangoController.getMangoById);
mangoRoute.patch("/:id", mangoController.updateMangoById);
mangoRoute.delete("/:id", mangoController.deleteMangoById);

export default mangoRoute;
