import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize('carRepair', 'postgres', '1125', {
    host: 'localhost',
    dialect: 'postgres'
})

