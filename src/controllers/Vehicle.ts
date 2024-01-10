import { Request, Response } from "express";
import { Vehicle } from "../models/Vehicle";
import { Client } from "../models/Client";
import { WorkOrder } from "../models/WorkOrder";

export const getVehicles = async (req: Request, res: Response) => {
  console.log("get vehicles");
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getVehicle = async (req: Request, res: Response) => {
  const { license_plate } = req.params;
  console.log("id vehiculo", license_plate);
  try {
    const vehicle = await Vehicle.findByPk(license_plate, {
      include: {
        model: Client,
        as: "client",
      },
    });
    res.status(200).json({ vehicle });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addVehicle = async (req: Request, res: Response) => {
  console.log("añadiendo vehículo");
  const {
    license_plate,
    brand,
    model,
    year_production,
    vin_number,
    rut_client,
  } = req.body;
  try {
    const isVehicleCreated = await Vehicle.findByPk(license_plate);
    const isUserCreated = await Client.findByPk(rut_client);
    if (isVehicleCreated) {
      res.status(400).json({
        message: `El vehículo con la patente ${license_plate} ya se encuentra en la base de datos`,
      });
      return;
    } else if (!isUserCreated) {
      res.status(400).json({
        message: `El cliente con el rut ${rut_client} no se encuentra en la base de datos`,
        type: "error",
      });
      return;
    }
    const vehicleToCreate = await Vehicle.create({
      license_plate,
      brand,
      model,
      year_production,
      vin_number,
      rut_client,
    });
    res.status(200).json({
      message: `El vehículo con la patente ${license_plate} ha sido creado!`,
      type: "info",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { license_plate } = req.params;
  try {
    const vehicle = await Vehicle.findByPk(license_plate);
    if (vehicle) {
      vehicle.destroy();
      res.status(200).json({
        message: `El vehículo con la patente ${license_plate} ha sido eliminado!`,
        type: "info",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { license_plate } = req.params;
  const { brand, model, year_production, vin_number } = req.body;
  try {
    Vehicle.update(
      { license_plate, brand, model, year_production, vin_number },
      { where: { license_plate } }
    );
    res.status(200).json({ message: "Vehicle updated!" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};
