import { Router } from "express";
import { Login } from "../controllers/Auth";






const routes = Router()

routes.post('/login', Login)


export default routes