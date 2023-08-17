import { Request, Response } from 'express'
import { Spare } from '../models/Spare'



export const getSpares = async (req: Request, res: Response) => {
	try {
		const spares = await Spare.findAll()
		res.status(200).json(spares)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getSpare = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const spare = await Spare.findByPk(id)
		res.status(200).json(spare)
	} catch (error) {
		console.log(error)
	}
}

export const addSpare = async (req: Request, res: Response) => {
	const { name, cost, stock, unit_id, spareGroup_id } = req.body
	try {
		const newSpare = await Spare.create({ name, cost, stock, unit_id, spareGroup_id })
		res.status(200).json({ newSpare })
	} catch (error) {
		res.status(500).json({ message: error })
	}
}

export const deleteSpare = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const spareToDelete = await Spare.findByPk(id)
		if (spareToDelete) {
			spareToDelete.update({ status: false })
		}
	} catch (error) {
		res.status(500).json({ message: error })
	}
}

export const updateSpare = async (req: Request, res: Response) => {
	const { id } = req.params
	const { name, cost, stock } = req.body
	try {
		Spare.update({ name, cost, stock }, { where: { id } })
		res.status(200).json({})
	} catch (error) {
		res.status(500).json({ message: error })
	}
}