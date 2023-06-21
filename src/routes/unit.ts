import { Router } from "express";
import { addUnit, deleteUnit, getUnit, getUnits, updateUnit } from "../controllers/Unit";




const routes = Router()

routes.get('/', getUnits)
routes.get('/:id', getUnit)
routes.post('/', addUnit)
routes.delete('/', deleteUnit)
routes.put('/:id', updateUnit)

export default routes