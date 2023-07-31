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
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    observations: {
        type: DataTypes.STRING,
        allowNull: false
    },


})




WorkOrder.belongsTo(Vehicle, { foreignKey: 'license_vehicle' })
WorkOrder.belongsToMany(Spare,{through:'work_order',foreignKey:'spares_ids'})
WorkOrder.belongsTo(OrderGroup, { foreignKey: 'ot_type' })
WorkOrder.hasMany(Spare)