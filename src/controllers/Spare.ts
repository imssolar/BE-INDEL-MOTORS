import { Request, Response } from "express";
import { Spare } from "../models/Spare";



export const getSpares = async (req: Request, res: Response) => {
    try {
        const spares = Spare.findAll()
        res.status(200).json(spares)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
} 