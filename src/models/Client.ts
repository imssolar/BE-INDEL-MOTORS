import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import { IClient } from '../interfaces/Client'

/*
Además pasamos los datos para que puedas usarlos
*/
interface IClientModel extends Model<IClient>,IClient {

}


export const Client = sequelize.define<IClientModel>('client', {

	rut: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	names: {
		type: DataTypes.STRING,
		allowNull: false
	},
	surnames: {
		type: DataTypes.STRING,


	},
	cellphone_number: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	address: {
		type: DataTypes.STRING
	},
	district: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: true

	},
	status_description: {
		type: DataTypes.STRING
	}

	/*agregar status y una descripcion*/

}, {
	//Por cada registro, si es timestaps es true, te crea columnas como created_date, modified_date
	timestamps: false
})


/*
Tabla1.belongsTo(Tabla2, {
	foreignKey: 'tabla2Id',
	sourceKey: 'id'
})

Tabla2.hasMany(Tabla1, {
	foreignKey: 'tabla1id',
	sourceKey: 'id'
})

*/

