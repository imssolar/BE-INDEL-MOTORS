import { Request, Response } from "express";
import { Unit } from "../models/Unit";





export const getUnits = async (req: Request, res: Response) => {
    try {
        const units = Unit.findAll()
        res.status(200).json({ units })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getUnit = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const unit = await Unit.findByPk(id)
        res.status(200).json({ unit })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const addUnit = async (req: Request, res: Response) => {
    const { name_unit, description } = req.body
    try {
        const unitToCreate = await Unit.create({ name_unit, description })
        res.status(200).json({ unitToCreate })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const deleteUnit = async (req: Request, res: Response) => {
    const { id } = req.params
    try {

        const unit = await Unit.findByPk(id)
        if (unit) {
            unit.update({ status: false })
            res.status(200).json({ message: "Unit updated!" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateUnit = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name_unit, description } = req.body
    try {
        Unit.update({ name_unit, description }, { where: { id } })
        res.status(200).json({ message: "Client updated!" })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}