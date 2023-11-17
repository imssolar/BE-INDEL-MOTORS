import { Router } from "express";
import { addBrand, getBrandByID, getBrandByName, getBrands } from "../controllers/Brand";

const routes = Router();

routes.get("/", getBrands);
routes.get("/:id", getBrandByID);
routes.get("/:name", getBrandByName);
routes.post("/",addBrand)

export default routes;
