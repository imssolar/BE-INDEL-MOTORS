import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db'
import { SpareGroup } from './SpareGroup'
import { Unit } from './Unit'
import { WorkOrder } from './WorkOrder'

interface ISpare {
  id?: number;
  name: string;
  cost: number;
  stock: number;
  status?: boolean;
  unit_id?: number;
  spareGroup_id?: number;
}
interface ISpareModel extends Model<ISpare>, ISpare {}

export const Spare = sequelize.define<ISpareModel>('spare', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
	},
})

Spare.belongsTo(Unit, { foreignKey: 'unit_id' })
Spare.belongsTo(SpareGroup, { foreignKey: 'spareGroup_id' })
// Spare.belongsToMany(WorkOrder, {
//     through: 'spare',
//     foreignKey: 'item_id'
//   });
