import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize('car_repair', 'root', 'Modular.2024', {
	host: 'localhost',
	dialect: 'mysql'
})

