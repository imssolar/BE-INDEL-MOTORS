import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import { IUser } from '../interfaces/User'
import { Role } from './Role'

/*
<IClient>: Tipo del modelo
IUserModel es el nombre del modelo
IClient: implementame esta interfaz vacía por eso va con { }
*/
interface IUserModel extends Model<IUser>, IUser { }


export const User = sequelize.define<IUserModel>('user', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	last_name: {
		type: DataTypes.STRING,

	},
	password: {
		type: DataTypes.STRING,
		allowNull: false

	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	},
	// role: {
	//     type: DataTypes.STRING
	// }
})

User.belongsTo(Role)
