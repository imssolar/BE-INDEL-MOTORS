
import { Router } from 'express'
import {  getWorkOrder, getWorkOrders } from '../controllers/WorkOrder'



const router = Router()

router.get('/', getWorkOrders)
router.get('/:id', getWorkOrder)
// router.post('/', addWorkOrder)

export default router