import { Router } from 'express'
import { addOrderGroup, deleteOrderGroup, getOrderGroup, getOrderGroups, updateOrderGroup } from '../controllers/OrderGroup'







const routes = Router()

routes.get('/', getOrderGroups)
routes.get('/:name', getOrderGroup)
routes.post('/', addOrderGroup)
routes.delete('/:name', deleteOrderGroup)
routes.put('/:name', updateOrderGroup)



export default routes 