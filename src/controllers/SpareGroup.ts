import { Request, Response } from 'express'
import { SpareGroup } from '../models/SpareGroup'
import { ValidationError as SequelizeValidationError, ValidationError } from 'sequelize'





export const getSpareGroups = async (req: Request, res: Response) => {
	try {
		const sparesGroup = await SpareGroup.findAll()
		res.status(200).json(sparesGroup)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getSpareGroup = async (req: Request, res: Response) => {
	const { id } = req.params
	console.log(id)
	try {
		const group = await SpareGroup.findByPk(id)
		res.status(200).json(group)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}

export const addSpareGroup = async (req: Request, res: Response) => {
	const { name,description } = req.body

	try {
		const group = await SpareGroup.create({name,description})
		res.status(201).json({ group })
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
	const { name,description  } = req.body

	try {
		SpareGroup.update({ name,description  }, { where: { id } })
		res.status(200).json({ message: 'Spare group updated!' })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}