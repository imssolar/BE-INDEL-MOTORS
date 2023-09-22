import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateJWT";
import { validationResult } from "express-validator";

export const Login = async (req: Request, res: Response) => {
  const checkErrors = validationResult(req);
  if (!checkErrors.isEmpty()) {
    const mapErrors = checkErrors.array();
    return res.status(400).json({ errores: mapErrors });
  }
  const { email, password } = req.body;
  try {
    const findUser = await User.findByPk(email);
    if (!findUser) {
      return res.status(400).json({ message: "El email no está registrado" });
    }
    const isValidPassword = bcrypt.compareSync(password, findUser.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "El password es incorrecto" });
    }
    const generateResponse = await generateJWT(findUser.email);
    return res
      .status(200)
      .json({ message: "Login exitoso", token: generateResponse });
  } catch (error) {}
};
