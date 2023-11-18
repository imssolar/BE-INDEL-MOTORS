import { Router } from 'express'
import { Login, getUserByToken } from '../controllers/Auth'
import { validateJWT } from '../middlewares/JWTValidate'
import { check } from 'express-validator'

const routes = Router()
/**
 * @swagger
* /api/login:
*     post:
*      summary: Iniciar sesión
*      description: Iniciar sesión con credenciales de usuario.
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                email:
*                  type: string
*                  description: Dirección de correo electrónico del usuario.
*                password:
*                  type: string
*                  description: Contraseña del usuario.
*      responses:
*        '200':
*          description: Inicio de sesión exitoso.
*        '401':
*          description: Credenciales incorrectas.
*      security:
*        - appkey: []
* components:
*    securitySchemes:
*      appkey:
*        type: apiKey
*        in: header
*        name: appkey    
*      
*/routes.get('/',[validateJWT],getUserByToken)



routes.post(
	'/login',
	[
		check('email')
			.isEmail()
			.withMessage('El email no tiene el formato correcto'),
		check('password')
			.isLength({ min: 4 })
			.withMessage('La contraseña debe tener al menos 6 caracteres'),
	],
	Login
)

export default routes
