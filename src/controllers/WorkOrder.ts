import { Request, Response } from 'express'
import { WorkOrder, WorkOrderInstance } from '../models/WorkOrder'
import { ValidationError as SequelizeValidationError } from 'sequelize'
import { Spare } from '../models/Spare'

export const getWorkOrders = async (req: Request, res: Response) => {
	try {
		const wo = await WorkOrder.findAll()
		res.status(200).json(wo)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getWorkOrder = async (req: Request, res: Response) => {
	const { id } = req.params
	console.log(id)
	try {
		const wo = await WorkOrder.findByPk(id)
		res.status(200).json(wo)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}

export const addWorkOrder = async (req: Request, res: Response) => {
	const { observations, ot_type, license_vehicle,spares_ids } = req.body

	try {
		const workOrder = await WorkOrder.create({ observations, ot_type, license_vehicle })
		const spareInstances = await Spare.findAll({ where: { id: spares_ids } })
		if (spareInstances.length !== spares_ids.length) {
			return res.status(400).json({ message: 'Algún repuesto no existe en la BD' })
		}
		const spareIds = spareInstances.map(spare => spare.id).filter((id): id is number => id !== undefined);
		await (workOrder as WorkOrderInstance).addSpares(spareIds)
		res.status(201).json({ workOrder })
	} catch (error: any) {
		if (error instanceof SequelizeValidationError) {
			res.status(500).json({ message: error.errors[0].message })

		} else {
			res.status(500).json({ message: error.message })
		}
	}
}