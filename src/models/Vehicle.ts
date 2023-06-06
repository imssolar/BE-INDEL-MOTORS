import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Vehicle = sequelize.define('vehicle', {
    licence_plate: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
    },
    brand: {
        type: DataTypes.STRING,

    },
    model: {
        type: DataTypes.STRING
    },
    year_production: {
        type: DataTypes.INTEGER
    },
    vin_number: {
        type: DataTypes.INTEGER
    }

})