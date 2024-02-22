import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { OrderGroup } from "./OrderGroup";
import { Spare } from "./Spare";
import { Vehicle } from "./Vehicle";
import { IWorkOrder } from "../interfaces/WorkOrder";


interface IWorkOrderModel extends Model<IWorkOrder>,IWorkOrder {}




export interface WorkOrderInstance extends Model<IWorkOrder> {
  addSpare: (spareCodeId: string) => Promise<void>;
  addSpares: (spareCodeIds: string[]) => Promise<void>;
  getSpares: () => Promise<void>;
}

export const WorkOrder = sequelize.define<IWorkOrderModel>("work_order", {
  ot_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  observations: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_payment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spares_stock:{
    type:DataTypes.STRING,
    defaultValue:''
  }
});

WorkOrder.belongsTo(Vehicle, { foreignKey: "license_vehicle" });
// WorkOrder.belongsTo(Spare, { foreignKey: 'spares_ids' })
WorkOrder.hasMany(Spare, { foreignKey: "workOrderId", as: "spares_ids" });
WorkOrder.belongsTo(OrderGroup, { foreignKey: "ot_type" });
/*Tratar de cambiar nombre a minúscula*/
WorkOrder.belongsToMany(Spare, { as: "spares", through: "workorderspare" });
Spare.belongsToMany(WorkOrder, { as: "orders", through: "workorderspare" });
