import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/User";




const routes = Router()

routes.get('/', getUsers)
routes.get('/:id', getUser)
routes.post('/', addUser)
routes.delete('/:id', deleteUser)
routes.put('/:id', updateUser)

export default routes