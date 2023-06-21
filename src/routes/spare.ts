import { Router } from "express";
import { addSpare, deleteSpare, getSpare, getSpares, updateSpare } from "../controllers/Spare";

const routes = Router()

routes.get('/', getSpares)
routes.get('/:id', getSpare)
routes.post('/', addSpare)
routes.delete('/', deleteSpare)
routes.put('/:id', updateSpare)

export default routes