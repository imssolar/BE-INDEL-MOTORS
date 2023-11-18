import { Request, Response } from 'express'
import { SpareGroup } from '../models/SpareGroup'
import {
	ValidationError as SequelizeValidationError,
	ValidationError,
} from 'sequelize'

export const getSpareGroups = async (req: Request, res: Response) => {
	try {
		const sparesGroup = await SpareGroup.findAll()
		res.status(200).json(sparesGroup)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getSpareGroup = async (req: Request, res: Response) => {
	const { name } = req.params
	console.log(name)
	try {
		const sparegroup = await SpareGroup.findOne({
			where: { name: `${name}` },
		})
		if (!sparegroup) {
			res.status(400).json({
				message: `El grupo de repuesto con el nombre ${name} no se encuentra en la base de datos`,
				type: 'notFound',
			})
			return
		}
		res.status(200).json(sparegroup)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}

export const addSpareGroup = async (req: Request, res: Response) => {
	const { name, description } = req.body

	try {
		//Esto debe ser mayuscula o minuscula
		const isSpareGroupCreated = await SpareGroup.findOne({
			where: { name: `${name}` },
		})
		if (isSpareGroupCreated) {
			res.status(400).json({
				message: `El grupo de repuesto con el nombre ${name} ya se encuentra en la base de datos`,
				type: 'error',
			})
			return
		}
		const group = await SpareGroup.create({ name, description })
		res.status(201).json({
			message: 'Grupo de repuesto creado correctamente',
			type: 'info',
		})
	} catch (error: any) {
		if (error instanceof SequelizeValidationError) {
			res.status(500).json({ message: error.errors[0].message })
		} else {
			res.status(500).json({ message: error.message })
		}
	}
}

export const deleteSpareGroup = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const group = await SpareGroup.findByPk(id)
		if (group) {
			group.update({ status: false })
		}
		res.status(200).json({ message: 'Spare group deleted!' })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}

export const updateSpareGroup = async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, description } = req.body

	try {
		SpareGroup.update({ name, description }, { where: { id } })
		res.status(200).json({ message: 'Spare group updated!' })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}
