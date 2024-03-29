import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import { Client } from './Client'

export const Vehicle = sequelize.define('vehicle', {
	license_plate: {
		type: DataTypes.STRING,
		primaryKey: true,
		autoIncrement: false,
	},
	brand: {
		type: DataTypes.STRING,
	},
	model: {
		type: DataTypes.STRING,
	},
	year_production: {
		type: DataTypes.INTEGER,
	},
	vin_number: {
		type: DataTypes.STRING,
	},
})

Vehicle.belongsTo(Client, { foreignKey: 'rut_client' })
