import { Response, Request } from 'express'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import { generateJWT } from '../utils/generateJWT'

export const getUsers = async (req: Request, res: Response) => {
	const { size, page } = req.query
	/**
   * size: elementos que queremos mostrar por página
   * page: número de página actual
   */
	const sizeToNumber = Number(size) || 10
	const pageToNumber = Number(page) || 1
	const offset = (pageToNumber - 1) * sizeToNumber
	try {
		const users = await User.findAll({ limit: sizeToNumber, offset })
		const totalUsers = await User.count()
		const totalPage = Math.ceil(totalUsers / sizeToNumber)
		if (pageToNumber > totalPage) {
			return res
				.status(400)
				.json({ message: 'Excediste el número de páginas' })
		}
		res.status(200).json({
			users,
			pagination: {
				page: pageToNumber,
				size: sizeToNumber,
				total: totalUsers,
				totalPage,
			},
		})
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const user = await User.findByPk(id)
		res.status(200).json(user)
	} catch (error: any) {
		res.status(500).json(error)
	}
}

export const addUser = async (req: Request, res: Response) => {
	const { name, last_name, password, email, roleName } = req.body
	'validar que el usuario no exista antes de crearlo'
	try {
		const salt = bcrypt.genSaltSync(10)
		const encryptPassword = bcrypt.hashSync(password, salt)
		const user = await User.create({
			name,
			last_name,
			password: encryptPassword,
			email,
			roleName,
		})
		const generateToken = await generateJWT(user.email)
		res.status(201).json({ user, token: generateToken })
	} catch (error: any) {
		res.status(500).json(error)
	}
}
export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const user = await User.findByPk(id)
		if (user) {
			user.update({ enabled: false })
		}
		res.status(200).json({ message: 'User deleted!' })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, last_name, password, email } = req.body
	try {
		const user = await User.update(
			{ name, last_name, password, email },
			{ where: { email: id } }
		)
		res.status(200).json(user)
	} catch (error: any) {
		console.log(error)
	}
}
