import { Request, Response } from 'express'
import { Role } from '../models/Role'



export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.findAll()
        res.status(200).json(roles)
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export const getRole = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const role = await Role.findByPk(id)
        res.status(200).json(role)
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export const addRole = async (req: Request, res: Response) => {
    const { name, description } = req.body
    try {
        const role = await Role.create({ name, description })
        res.status(201).json(role)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const role = await Role.findByPk(id)
        if (role) {
            role.update({ enabled: false })
        }
        res.status(202).json({ message: 'Role disabled' })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body
    try {
        const role = await Role.update({ name, description }, { where: { id } })
        res.status(200).json(role)
    } catch (error: any) {
        res.status(500).json(error)
    }
}
