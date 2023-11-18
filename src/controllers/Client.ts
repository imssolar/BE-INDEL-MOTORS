import { Request, Response } from 'express'
import {
	ValidationError as SequelizeValidationError,
	ValidationError,
} from 'sequelize'
import { Client } from '../models/Client'
import { MessageType } from '../utils/typeMessage'

interface ResponseMessage {
  message: string;
  type: MessageType;
}

export const getClients = async (req: Request, res: Response) => {
	console.log('get clients')
	try {
		const clients = await Client.findAll()
		res.status(200).json(clients)
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

export const getClient = async (req: Request, res: Response) => {
	const { rut } = req.params
	try {
		const client = await Client.findByPk(rut)
		if (!client) {
			const resp: ResponseMessage = {
				message: 'El cliente no se encuentra en la base de datos',
				type: 'notFound',
			}
			res.status(200).json(resp)
			return
		}
		res.status(200).json({ client })
	} catch (error: any) {
		res.status(500).json({ message: error.message, type: 'error' })
	}
}
/*CREAR OBJETO DE ERRORES
crear error personalizado
*/
export const addClient = async (req: Request, res: Response) => {
	const { rut, names, surnames, cellphone_number, address, district, email } =
    req.body
	try {
		const findClient = await Client.findByPk(rut)
		if (findClient) {
			res.status(400).json({
				message: `El cliente con el rut ${rut} ya se encuentra en la base de datos`,
				type: 'error',
			})
			return
		}
		const client = await Client.create({
			rut,
			names,
			surnames,
			cellphone_number,
			district,
			address,
			email,
		})
		res
			.status(201)
			.json({ message: 'Cliente creado correctamente', type: 'info' })
	} catch (error: any) {
		if (error instanceof SequelizeValidationError) {
			res.status(500).json({ message: error.errors[0].message })
		} else {
			res.status(500).json({ message: error.message, type: 'error' })
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

export const deleteClient = async (req: Request, res: Response) => {
	const { rut } = req.params
	try {
		const client = await Client.findByPk(rut)
		if (!client) {
			res.status(400).json({
				message: 'El cliente a eliminar no se encuentra en la base de datos',
				type: 'error',
			})
			return
		}
		client.destroy()
		res.status(200).json({
			message: `El cliente con el rut ${client.rut} ha sido eliminado`,
		})
	} catch (error: any) {
		res.status(500).json({ message: error.message, type: 'error' })
	}
}

export const updateClient = async (req: Request, res: Response) => {
	const { rut } = req.params
	const { names, surnames, cellphone_number, address, district, email } =
    req.body

	try {
		const client = await Client.findByPk(rut)
		if (!client) {
			res.status(400).json({
				message: 'El cliente no se encuentra en la base de datos',
				type: 'error',
			})
			return
		}
		Client.update(
			{ names, surnames, cellphone_number, address, district, email },
			{ where: { rut } }
		)
		res
			.status(200)
			.json({
				message: `El cliente con el rut ${rut} ha sido actualizado correctamente`,
				type: 'info',
			})
	} catch (error: any) {
		res.status(500).json({ message: error.message, type: 'error' })
	}
}
