
import { DataTypes } from "sequelize"
import { sequelize } from "../db"




export const Unit = sequelize.define('unit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name_unit: {
        type: DataTypes.STRING,

    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})