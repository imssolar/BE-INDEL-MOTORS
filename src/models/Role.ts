import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import { User } from './User'



export const Role = sequelize.define('role', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	description: {
		type: DataTypes.STRING
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	}
})