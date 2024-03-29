import { Request, Response } from 'express'
import { WorkOrder, WorkOrderInstance } from '../models/WorkOrder'
import { ValidationError as SequelizeValidationError } from 'sequelize'
import { Spare } from '../models/Spare'
import { OrderGroup } from '../models/OrderGroup'

/*se deben recuperar los spare  */

interface IResValidate {
  name: string;
  stockThatINeed: number;
}

interface ISpareStock {
  id: string;
  stock: number;
}

const validateSpareStock = async (
	spares: ISpareStock[]
): Promise<IResValidate[]> => {
	const resValidate = []
	for (const spare of spares) {
		const spareValue = await Spare.findByPk(spare.id)

		if (spareValue && spareValue.stock - spare.stock < 0) {
			//No sería posible utilizar este repuesto ya que no tiene stock
			const obj = {
				name: spareValue.name,
				currentStock: spareValue.stock,
				stockThatINeed: Math.abs(spareValue.stock - spare.stock),
				requestedStock:
          spareValue.stock + Math.abs(spareValue.stock - spare.stock),
			}
			resValidate.push(obj)
		}
	}
	return resValidate
}

const substractStock = async (spares: ISpareStock[]): Promise<void> => {
	for (const spare of spares) {
		const spareFound = await Spare.findByPk(spare.id)
		spareFound!.stock = spareFound!.stock < 0
			? spareFound!.stock + Math.abs(spare.stock)
			: spareFound!.stock - (spare.stock ?? 0)
		await spareFound?.save()
	}
}

export const getWorkOrders = async (req: Request, res: Response) => {
	try {
		const wo = await WorkOrder.findAll({
			include: { model: Spare, as: 'spares' },
		})
		res.status(200).json(wo)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getWorkOrder = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const findWorkOrder = await WorkOrder.findAll({
			where: { license_vehicle: id },
		})
		res.status(200).json(findWorkOrder)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}

export const getWorkOrderByOtNumber = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const workOrder = await WorkOrder.findByPk(id)
		if (!workOrder) {
			return res.status(404).json({
				message: 'No se encontró la orden de trabajo',
				type: 'notFound',
			})
		}
		const otType = await OrderGroup.findByPk(workOrder.ot_type)
		const otTypeProps = otType?.id + '-' + otType?.name
		const spares = await (
      workOrder as unknown as WorkOrderInstance
		).getSpares()
		console.log('ubicando spares' + spares)
		const obj = { workOrder, spares, otTypeProps }
		return res.status(200).json(obj)
	} catch (error) {}
}

export const updateWorkOrder = async (req: Request, res: Response) => {
	const { observations, ot_type, license_vehicle, spares,  is_confirmed,
		is_payment } = req.body
	const { id } = req.params
	/**
   * Validar el stock de repuestos antes de la creación
   * En el caso de que el stock sea mayor o igual, descontarlo y continuar con la creación
   * en caso contrario arrojar error al usuario
   *
   */
	const workOrderByID = await WorkOrder.findByPk(id)
	console.log('workOrderByID', workOrderByID)

	//TODO:
	/** Queda validar que cuando se actualice el stock se actualice tambien en la WO
		 Te lo deje por consola la data que viene cuando haces el getByID,
		 viene el valor pares_stock (recorda que es id,numero de stock), 
		 necesitas que ese valor se actualice es decir ejemplo:
		 si tenes 3 stock y agregas dos es decir en el front envias 5 necesitas actualizar ese numero que pase de 3 a 5
		 lo mismo si restas si tenes 3 stock y sacas 2 tiene que quedar uno
		 la logica de suma o resta contra spares ya esta solo queda el lado visual
		*/
	//TODO:

	const spares_ids = spares.map((ids: any) => ids.id)
	try {
		const spareInstances = await Spare.findAll({
			where: { code_id: spares_ids },
		})
		if (spareInstances.length !== spares_ids.length) {
			return res
				.status(400)
				.json({ message: 'Algún repuesto no existe en la BD' })
		}
		//Validar si tengo stock de todos los repuestos
		const sparesWithoutStock = await validateSpareStock(spares)
		if (sparesWithoutStock.length > 0) {
			return res.status(400).json({
				sparesWithoutStock,
				message:
          'No se pudo crear la orden de trabajo debido a falta de stock de algún(s) repuestos',
				type: 'outStock',
			})
		}

		//Descontar stock de todos los repuestos necesarios
		await substractStock(spares)
		const workOrder = await WorkOrder.update(
			{
				observations,
				ot_type,
				license_vehicle,
				is_confirmed,
				is_payment,
			},
			{ where: { ot_number: id } }
		)
		res.status(200).json({ workOrder })
	} catch (error: any) {
		if (error instanceof SequelizeValidationError) {
			res.status(500).json({ message: error.errors[0].message })
		} else {
			res.status(500).json({ message: error.message })
		}
	}
}

export const addWorkOrder = async (req: Request, res: Response) => {
	const {
		observations,
		ot_type,
		license_vehicle,
		spares,
		is_confirmed,
		is_payment,
	} = req.body
	const { id } = req.params
	const spares_ids = spares.map((ids: any) => ids.id)
	try {
		const spareInstances = await Spare.findAll({
			where: { code_id: spares_ids },
		})
		if (spareInstances.length !== spares_ids.length) {
			return res
				.status(400)
				.json({ message: 'Algún repuesto no existe en la BD' })
		}

		const sparesWithoutStock = await validateSpareStock(spares)
		if (sparesWithoutStock.length > 0) {
			return res.status(400).json({
				sparesWithoutStock,
				message:
          'No se pudo crear la orden de trabajo debido a falta de stock de algún(s) repuestos',
				type: 'outStock',
			})
		}

		if (is_confirmed) {
			console.log('La orden está confirmada y se procede a restar el stock')
			await substractStock(spares)
			// const workOrder = await WorkOrder.update(
			//   {
			//     observations,
			//     ot_type,
			//     license_vehicle,
			//     is_confirmed,
			//     is_payment,
			//   },
			//   { where: { ot_number: id } }
			// );
		}

		const arrayMaps = spares
			.map((spare: any) => `${spare.id},${spare.stock}`)
			.join('|')

		const workOrder = await WorkOrder.create({
			observations,
			ot_type,
			license_vehicle,
			is_confirmed,
			is_payment,
			spares_stock: arrayMaps,
		})
		const spareIds = spareInstances
			.map((spare) => spare.code_id)
			.filter((id): id is string => id !== undefined)
		await (workOrder as unknown as WorkOrderInstance).addSpares(spareIds)
		res.status(201).json({ workOrder })
	} catch (error) {}
}
