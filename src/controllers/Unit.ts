import { Request, Response } from 'express'
import { Unit } from '../models/Unit'

export const getUnits = async (req: Request, res: Response) => {
	try {
		const units = await Unit.findAll()
		res.status(200).json({ units })
	} catch (error) {
		res.status(500).json({ message: error })
	}
}

export const getUnit = async (req: Request, res: Response) => {
	const { name } = req.params
	try {
		const unit = await Unit.findOne({
			where: { name_unit: `${name}` },
		})
		console.log(unit)
		if (!unit) {
			console.log('La unidad no se encuentra')
			return res.status(404).json({
				message: `La unidad con el nombre ${name} no se ha encontrado`,
				type: 'notFound',
			})
			
		}
		res.status(200).json({ unit })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: error })
	}
}

export const addUnit = async (req: Request, res: Response): Promise<void> => {
	const { name_unit, description } = req.body
	try {
		const isUnitCreated = await Unit.findOne({ where: { name_unit } })
		if (isUnitCreated) {
			console.log('Ya está creada')
			res.status(422).json({
				message: `La unidad con el nombre ${name_unit} ya se encuentra creada`,
				type: 'error',
			})
			return
		}
		await Unit.create({ name_unit, description })
		res
			.status(200)
			.json({
				message: `La unidad con el nombre ${name_unit} ha sido creada `,
				type: 'info',
			})
	} catch (error) {
		res.status(500).json({ message: error })
	}
}

export const deleteUnit = async (
	req: Request,
	res: Response
) => {
	const { name } = req.params
	try {
		const unitToDelete = await Unit.findOne({ where: { name_unit: name } })
		if (!unitToDelete) {
			return res.status(404).json({
				message: `La unidad con el nombre ${name} no se ha encontrado`,
				type: 'info',
			})

		}

		unitToDelete?.destroy()
		res.status(200).json({
			message: `La unidad con el nombre ${name} se ha eliminado`,
			type: 'info',
		})
	} catch (error) {
		res.status(500).json({ message: error })
	}
}

export const updateUnit = async (req: Request, res: Response):Promise<void> => {
	const { name } = req.params
	console.log('req params', name)
	const { name_unit, description } = req.body
	try {
		const unitToEdit = await Unit.findOne({ where: { name_unit: `${name}` } })
		console.log('UNIDAD A EDITAR', unitToEdit)
		if (!unitToEdit) {
			res.status(400).json({
				message: `El tipo de unidad con el nombre ${name} no ha sido encontrada`,
				type: 'notFound',
			})
			return
		}
		Unit.update({ name_unit, description }, { where: { name_unit: name } })
		res.status(200).json({
			message: `El tipo de unidad ${name} ha sido actualizada`,
			type: 'info',
		})
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}
