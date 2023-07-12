import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize('carRepair', 'postgres', '123456', {
	host: 'localhost',
	dialect: 'postgres'
})

