import { Router } from "express";
import {
  addSpare,
  deleteSpare,
  getSpare,
  getSpareByCode,
  getSpares,
  updateSpare,
} from "../controllers/Spare";

const routes = Router();

routes.get("/", getSpares);
routes.get("/:code_id", getSpareByCode);
routes.post("/", addSpare);
routes.delete("/", deleteSpare);
routes.put("/:code_id", updateSpare);

export default routes;
