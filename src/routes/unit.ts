import { Router } from 'express'
import { addUnit, deleteUnit, getUnit, getUnits, updateUnit } from '../controllers/Unit'



const routes = Router()
/**
 * @swagger
 * /api/unit/:
 *   get:
 *     summary: Obtiene las unidades.
 *     responses:
 *       '200':
 *         description: OK.
 */
routes.get('/', getUnits)
routes.get('/:name', getUnit)
routes.post('/', addUnit)
routes.delete('/:name', deleteUnit)
routes.put('/:name', updateUnit)

export default routes