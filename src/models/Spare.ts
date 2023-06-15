import { DataTypes } from "sequelize";
import { sequelize } from "../db";



export const Spare = sequelize.define('spare', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false

    },
    /*Esto debe estar ligado a una tabla Unidad o tipo de unidad*/
    unit: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    /*Esto debe estar ligado a una tabla grupo*/
    group: {
        type: DataTypes.STRING
    }

})