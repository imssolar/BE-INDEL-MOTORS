import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/User'
import { IUser } from '../interfaces/User'

interface Ijwt {
  id: string;
  iat: number;
  exp: number;
}

export interface RequestUser extends Request {
  user: IUser;
}

export const validateJWT = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const token = request.header('x-token')
	if (!token) return response.status(400).json({ message: 'No hay token' })
	const secret = process.env.SECRET_JWT ?? ''
	try {
		const verifyJWT: Ijwt = jwt.verify(token, secret) as Ijwt
		const verifyUser = await User.findByPk(verifyJWT.id)
		//crear objeto custom y enviar solo lo de datavalues (sin password ni los created)
		if (!verifyUser)
			return response.status(401).json({ message: 'Usuario no encontrado!' });
		(<RequestUser>request).user = verifyUser
		next()
	} catch (error: any) {
		console.log(error)
		response.status(401).json({ error: error.message })
	}
}
