import { DataTypes } from "sequelize";
import { sequelize } from "../db";



export const WorkOrder = sequelize.define('work_order', {
    ppu: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    ot_number: {
        type: DataTypes.INTEGER,
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
    }
})