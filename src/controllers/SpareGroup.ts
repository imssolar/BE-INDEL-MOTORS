import { Request, Response } from 'express'
import { SpareGroup } from '../models/SpareGroup'
import { ValidationError as SequelizeValidationError } from 'sequelize'

export const getSpareGroups = async (req:Request,res: Response): Promise<void> => {
	console.log('getSparegroups')
	try {
		const sparesGroup = await SpareGroup.findAll()
		 res.status(200).json(sparesGroup)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getSpareGroup = async (
	req: Request,
	res: Response
) => {
	const { name } = req.params
	console.log(name)
	try {
		const sparegroup = await SpareGroup.findOne({
			where: { name: `${name}` },
		})
		if (!sparegroup) {
			return res.status(400).json({
				message: `El grupo de repuesto con el nombre ${name} no se encuentra en la base de datos`,
				type: 'notFound',
			})
			
		}
		return res.status(200).json(sparegroup)
	} catch (error: any) {
		return res.status(500).json({ message: error })
	}
}

export const addSpareGroup = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name, description } = req.body

	try {
		//Esto debe ser mayuscula o minuscula
		const isSpareGroupCreated = await SpareGroup.findOne({
			where: { name: `${name}` },
		})
		if (isSpareGroupCreated) {
			res.status(400).json({
				message: `El grupo de repuesto con el nombre ${name} ya se encuentra creado`,
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

export const deleteSpareGroup = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name: nameGroup } = req.params
	try {
		const isSpareGroupCreated = await SpareGroup.findOne({
			where: { name: nameGroup },
		})
		console.log(isSpareGroupCreated)
		if (!isSpareGroupCreated) {
			res.status(400).json({
				message: `El grupo de repuesto con el nombre ${nameGroup} no está  creado, por lo tanto, no es posible eliminarlo`,
				type: 'info',
			})
		}
		isSpareGroupCreated?.destroy()
		res.status(200).json({
			message: `El grupo de repuesto con el nombre ${nameGroup} ha sido eliminado`,
			type: 'info',
		})
	} catch (error: any) {
		// res.status(500).json({ message: error.message })
		console.log('error delete',error)
	}
}

export const updateSpareGroup = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name: nameGroup } = req.params
	const { name, description } = req.body

	try {
		const isSpareGroupCreated = await SpareGroup.findOne({
			where: { name: nameGroup },
		})
		if (!isSpareGroupCreated) {
			res.status(400).json({
				message: `El grupo de repuesto ${nameGroup} no se encuentra creado aún`,
				type: 'info',
			})
			return
		}
		SpareGroup.update({ name, description }, { where: { name: nameGroup } })
		res.status(200).json({
			message: `El grupo de repuesto con el nombre ${nameGroup} ha sido actualizado`,
			type: 'info',
		})
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}
