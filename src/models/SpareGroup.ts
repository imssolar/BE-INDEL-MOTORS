import { DataTypes } from "sequelize";
import { sequelize } from "../db";


export const SpareGroup = sequelize.define('spare_group', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})