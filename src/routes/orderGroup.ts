import { Router } from "express";
import { addOrderGroup, deleteOrderGroup, getOrderGroup, getOrderGroups, updateOrderGroup } from "../controllers/OrderGroup";







const routes = Router()

routes.get('/', getOrderGroups)
routes.get('/:id', getOrderGroup)
routes.post('/', addOrderGroup)
routes.delete('/', deleteOrderGroup)
routes.put('/:id', updateOrderGroup)



export default routes 