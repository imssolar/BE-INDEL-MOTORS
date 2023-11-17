import { Request, Response } from "express";
import { Brand } from "../models/Brand";

export const getBrands = async (req: Request, res: Response) => {
  try {
    const allBrands = await Brand.findAll();
    res.status(200).json( allBrands );
  } catch (error: any) {
    res.status(500).json({ message: error.message, type: "error" });
  }
};

export const getBrandByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      res.status(404).json({
        message: "La marca de vehículo no se encuentra en la base de datos",
        type: "notFound",
      });
      return;
    }
    res.status(200).json(brand);
  } catch (error: any) {
    res.status(500).json({ message: error.message, type: "error" });
  }
};

export const getBrandByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const brandByName = await Brand.findOne({
      where: { name: `${name}` },
    });
    if (!brandByName) {
      res.status(400).json({
        message: `La marca ${name} no se encuentra en la base de datos`,
        type: "notFound",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message, type: "error" });
  }
};

export const addBrand = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const isBrandCreated = await Brand.findOne({
      where: { name: `${name}` },
    });
    if (isBrandCreated) {
      res
        .status(400)
        .json({
          message: `La marca ${name} ya se encuentra creada`,
          type: "error",
        });
      return;
    }
    const createBrand = await Brand.create({ name });
    res
      .status(201)
      .json({ message: "Marca creada correctamente", type: "info" });
  } catch (error: any) {
    res.status(500).json({ message: error.message, type: "error" });
  }
};
