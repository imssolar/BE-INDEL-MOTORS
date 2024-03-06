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
  const { email, password: pass } = req.body;
  try {
    const findUser = await User.findByPk(email);
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "El email no está registrado", type: "notFound" });
    }
    const isValidPassword = bcrypt.compareSync(pass, findUser.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "El password es incorrecto", type: "error" });
    }
    const generateResponse = await generateJWT(findUser.email);
    const { name, last_name, email: email_user, roleName, enabled } = findUser;
    return res.status(200).json({
      message: "Login exitoso",
      token: generateResponse,
      user: { name, last_name, email: email_user, roleName, enabled },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserByToken = (req: Request) => {
  console.log(req);
};
