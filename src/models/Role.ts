import { DataTypes } from "sequelize";
import { sequelize } from "../db";



export const Role = sequelize.define('role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})