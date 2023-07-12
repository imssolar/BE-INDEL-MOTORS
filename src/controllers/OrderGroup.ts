import { Request, Response } from 'express'
import { ValidationError as SequelizeValidationError, ValidationError } from 'sequelize'
import { IClient } from '../interfaces/Client'
import { Client } from '../models/Client'
import { OrderGroup } from '../models/OrderGroup'



export const getOrderGroups = async (req: Request, res: Response) => {

	try {
		const order = await OrderGroup.findAll()
		res.status(200).json(order)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getOrderGroup = async (req: Request, res: Response) => {

	const { id } = req.params

	try {
		const order = await OrderGroup.findByPk(id)
		res.status(200).json(order)
	} catch (error: any) {
		res.status(500).json({ message: error })
	}
}
/*CREAR OBJETO DE ERRORES
crear error personalizado
*/
export const addOrderGroup = async (req: Request, res: Response) => {
	const { name  } = req.body

	try {
		const order = await OrderGroup.create({ name })
		res.status(201).json({ order })
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

export const deleteOrderGroup = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const order = await Client.findByPk(id)
		if (order) {
			order.update({ status: false })
		}
		res.status(200).json({ message: 'Order deleted!' })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}

export const updateOrderGroup = async (req: Request, res: Response) => {
	const { id } = req.params
	const { name} = req.body

	try {
		OrderGroup.update({ name }, { where: { id } })
		res.status(200).json({ message: 'Client updated!' })
	} catch (error) {
		res.status(500).json({ message: 'error' })
	}
}
