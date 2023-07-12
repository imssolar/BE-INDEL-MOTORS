import { Router } from 'express'
import { addVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from '../controllers/Vehicle'

//routes puede tener más de dos parámetros, el primero siempre será el path(ruta) y el segundo puede ser un array de middlewares
const routes = Router()

routes.get('/', getVehicles)
routes.get('/:license_plate', getVehicle)
routes.post('/', addVehicle)
routes.delete('/:license_plate', deleteVehicle)
routes.put('/:license_plate', updateVehicle)

export default routes