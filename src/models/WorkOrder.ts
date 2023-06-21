import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { OrderGroup } from "./OrderGroup";
import { Spare } from "./Spare";
import { Vehicle } from "./Vehicle";



export const WorkOrder = sequelize.define('work_order', {
    ot_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    ppu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ot_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
})



OrderGroup.belongsTo(WorkOrder, {
	foreignKey: 'work_order_id',
})

WorkOrder.belongsTo(Vehicle)
WorkOrder.belongsTo(Spare)
WorkOrder.hasOne(Vehicle)
WorkOrder.hasOne(OrderGroup)
WorkOrder.hasMany(Spare)