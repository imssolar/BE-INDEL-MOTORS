import { Request, Response } from "express";
import { ValidationError as SequelizeValidationError, ValidationError } from 'sequelize';
import { IClient } from "../interfaces/Client";
import { Client } from "../models/Client";



export const getClients = async (req: Request, res: Response) => {
    console.log("get clients")
    try {
        const clients = await Client.findAll()
        res.status(200).json(clients)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getClient = async (req: Request, res: Response) => {
    console.log("get client")
    const { rut } = req.params
    console.log(rut)
    try {
        const client = await Client.findByPk(rut)
        res.status(200).json(client)
    } catch (error: any) {
        res.status(500).json({ message: error })
    }
}
/*CREAR OBJETO DE ERRORES
crear error personalizado
*/
export const addClient = async (req: Request, res: Response) => {
    const { rut, names, surnames, cellphone_number, address, district, email } = req.body

    try {
        const client = await Client.create({ rut, names, surnames, cellphone_number, district, address, email })
        res.status(201).json({ client })
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

export const deleteClient = async (req: Request, res: Response) => {
    const { rut } = req.params
    try {
        const client = await Client.findByPk(rut)
        if (client) {
            client.update({ status: false })
        }
        res.status(200).json({ message: "Client deleted!" })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

export const updateClient = async (req: Request, res: Response) => {
    const { rut } = req.params
    const { names, surnames, cellphone_number, address, district, email } = req.body

    try {
        Client.update({ names, surnames, cellphone_number, address, district, email }, { where: { rut } })
        res.status(200).json({ message: "Client updated!" })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}
