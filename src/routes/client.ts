import { Router } from 'express'
import { getClients, getClient, addClient, deleteClient, updateClient } from '../controllers/Client'

//routes puede tener más de dos parámetros, el primero siempre será el path(ruta) y el segundo puede ser un array de middlewares
const routes = Router()

routes.get('/', getClients)
routes.get('/:rut', getClient)
routes.post('/', addClient)
routes.delete('/:rut', deleteClient)
routes.put('/:rut', updateClient)

export default routes