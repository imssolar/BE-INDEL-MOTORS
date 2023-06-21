import { Request, Response } from "express"
import { WorkOrder } from "../models/WorkOrder"
import { ValidationError as SequelizeValidationError, ValidationError } from 'sequelize';






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
    const { ppu, observations } = req.body

    try {
        const client = await WorkOrder.create({ ppu, observations })
        res.status(201).json({ client })
    } catch (error: any) {
        if (error instanceof SequelizeValidationError) {
            res.status(500).json({ message: error.errors[0].message })

        } else {
            res.status(500).json({ message: error.message })

        }
    }

}