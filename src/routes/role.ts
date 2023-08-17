



import { Router } from "express";
import { addRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/Role";





const routes = Router()

routes.get('/', getRoles)
routes.get('/:id', getRole)
routes.post('/', addRole)
routes.delete('/:id', deleteRole)
routes.put('/:id', updateRole)

export default routes