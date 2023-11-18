import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize('car_repair', 'root', '3312', {
	host: 'localhost',
	dialect: 'mysql'
})

