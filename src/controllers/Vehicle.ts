import { Request, Response } from "express";
import { Vehicle } from "../models/Vehicle";



export const getVehicles = async (req: Request, res: Response) => {
    console.log("get vehicles")
    try {
        const vehicles = Vehicle.findAll()
        res.status(200).json({ vehicles })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getVehicle = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const vehicle = await Vehicle.findByPk(id)
        res.status(200).json({ vehicle })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const addVehicle = async (req: Request, res: Response) => {

    const { license_plate, brand,model,year_production,vin_number } = req.body
    try {
        const vehicleToCreate = await Vehicle.create({ license_plate, brand,model,year_production,vin_number})
        res.status(200).json({ vehicleToCreate })

    } catch (error) {
        res.status(500).json({ message: error })

    }
}

export const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params
    try {

        const vehicle = await Vehicle.findByPk(id)
        if (vehicle) {
            vehicle.update({ status: false })
            res.status(200).json({ message: "vehicle updated!" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params
    const { license_plate, brand,model,year_production,vin_number } = req.body
    try {
        Vehicle.update({ license_plate, brand,model,year_production,vin_number }, { where: { id } })
        res.status(200).json({ message: "Vehicle updated!" })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}