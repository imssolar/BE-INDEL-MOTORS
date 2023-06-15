import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const OrderGroup = sequelize.define('order_group', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})