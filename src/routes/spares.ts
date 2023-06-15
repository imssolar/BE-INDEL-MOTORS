import { Router } from "express";
import { getSpares } from "../controllers/Spare";

const routes = Router()

routes.get('/',getSpares)