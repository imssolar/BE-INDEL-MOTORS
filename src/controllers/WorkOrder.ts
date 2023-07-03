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
    const { observations, ot_type, license_vehicle,spares_ids } = req.body

    try {
        const workorder = await WorkOrder.create({ observations, ot_type, license_vehicle,spares_ids })
        res.status(201).json({ workorder })
    } catch (error: any) {
        if (error instanceof SequelizeValidationError) {
            res.status(500).json({ message: error.errors[0].message })

        } else {
            res.status(500).json({ message: error.message })

        }
    }

}