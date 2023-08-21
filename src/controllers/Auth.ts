import { Request, Response } from "express"
import { User } from "../models/User"
import bcrypt from 'bcryptjs'


export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const findUser = await User.findByPk(email)
        if (!findUser) {
            return res.status(400).json({ message: "El email no está registrado" })
        }
        const isValidPassword = bcrypt.compareSync(password, findUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "El password es incorrecto" })
        }
        return res.status(200).json({ message: "Login exitoso" })
    } catch (error) {

    }
}