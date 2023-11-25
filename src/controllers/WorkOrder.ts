import { Request, Response } from 'express'
import { WorkOrder, WorkOrderInstance } from '../models/WorkOrder'
import { ValidationError as SequelizeValidationError } from 'sequelize'
import { Spare } from '../models/Spare'

/*se deben recuperar los spare  */

// const substractStock = async(spares:any) => {
// 	for(const spare of spares){
// 		const spareValue = await Spare.findByPk(spare.id)
// 		if(spareValue?.stock - spare.stock <=0 ){
// 			//No sería posible utilizar este repuesto ya que no tiene stock
// 		}
// 		spareValue.stock -= spare.stock
// 		await spareValue?.save()
// 	}
// }


export const getWorkOrders = async (req: Request, res: Response) => {
	try {
		const wo = await WorkOrder.findAll({include:{model:Spare,as:'spares'}})
		res.status(200).json(wo)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getWorkOrder = async (req: Request, res: Response) => {
	const { id } = req.params
	console.log(id)
	try {
		const wo = await WorkOrder.findByPk(id, {include:{model:Spare,as:'spares'}})
		res.status(200).json(wo)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}

export const addWorkOrder = async (req: Request, res: Response) => {
	const { observations, ot_type, license_vehicle,spares } = req.body
	console.log(observations)
	console.log(ot_type)
	console.log(spares.map((ids:any)=>ids.id))
	/**
	 * Validar el stock de repuestos antes de la creación
	 * En el caso de que el stock sea mayor o igual, descontarlo y continuar con la creación
	 * en caso contrario arrojar error al usuario
	 * 
	 */
	const spares_ids = spares.map((ids:any)=>ids.id)
	try {
		const spareInstances = await Spare.findAll({ where: { id: spares_ids } })
		if (spareInstances.length !== spares_ids.length) {
			return res.status(400).json({ message: 'Algún repuesto no existe en la BD' })
		}
		
		const workOrder = await WorkOrder.create({ observations, ot_type, license_vehicle })
		const spareIds = spareInstances.map(spare => spare.id).filter((id): id is number => id !== undefined)
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