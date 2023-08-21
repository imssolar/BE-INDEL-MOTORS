import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize('car_repair', 'root', 'Modular.2023@', {
	host: 'localhost',
	dialect: 'mysql'
})

