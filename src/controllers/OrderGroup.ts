import { Request, Response } from 'express'
import {
	ValidationError as SequelizeValidationError,
	ValidationError,
} from 'sequelize'

import { OrderGroup } from '../models/OrderGroup'

export const getOrderGroups = async (req: Request, res: Response) => {
	try {
		const order = await OrderGroup.findAll()
		res.status(200).json(order)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getOrderGroup = async (req: Request, res: Response):Promise<void> => {
	const { name } = req.params

	try {
		const isOrderGroupCreated = await OrderGroup.findOne({ where: { name } })
		if (!isOrderGroupCreated) {
			res.status(400).json({
				message: `El tipo de orden ${name} no se encuentra creada aún`,
				type: 'notFound',
			})
			return
		}
		res.status(200).json(isOrderGroupCreated)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}
/*CREAR OBJETO DE ERRORES
crear error personalizado
*/
export const addOrderGroup = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name } = req.body

	try {
		const isOrderGroupCreated = await OrderGroup.findOne({ where: { name } })
		if (isOrderGroupCreated) {
			res.status(400).json({
				message: `El tipo de orden ${name} ya se encuentra creada`,
				type: 'info',
			})
			return
		}
		await OrderGroup.create({ name })
		res.status(201).json({
			message: `El tipo de orden con el nombre ${name} ha sido creado`,
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

/*
    req.params---> parámetros que llegan en la url sin el signo ? . Ejemplo : localhost:4000/api/account/18740278-6
    req.query---> parámetros opciones, puede ser más de uno. Ejemplo : localhost:4000/api/account?rut=18740278-6
    para agregar otro sería el signo '&' y después signo de pregunta. localhost:4000/api/account?rut=18740278-6&nombre=ivan
    req.body--->  Lo que se envía cuando se hace un post o un update. El cuerpo del mensaje.
    req.headers
*/

export const deleteOrderGroup = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name } = req.params
	try {
		const isOrderGroupCreated = await OrderGroup.findOne({ where: { name } })
		if (!isOrderGroupCreated) {
			res.status(400).json({
				message: `El tipo de orden con el nombre ${name} no se encuentra creada`,
				type: 'error',
			})
			return
		}
		await isOrderGroupCreated.destroy()
		res
			.status(200)
			.json({
				message: `El tipo de orden con el nombre ${name} ha sido eliminada`,
				type: 'info',
			})
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}

export const updateOrderGroup = async (req: Request, res: Response):Promise<void> => {
	const { name } = req.params
	const { name:nameOrderGroup } = req.body

	try {
		const isOrderGroupCreated = await OrderGroup.findOne({ where: { name } })
		if(!isOrderGroupCreated){
			res.status(400).json({
				message: `El tipo de orden con el nombre ${name} no se encuentra creada`,
				type: 'error',
			})
			return
		}
		OrderGroup.update({ name:nameOrderGroup }, { where: { name } })
		res.status(200).json({ message: `El tipo de orden con el nombre ${name} ha sido actualizada` })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}
