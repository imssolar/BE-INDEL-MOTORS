import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const OrderGroup = sequelize.define('order_group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})