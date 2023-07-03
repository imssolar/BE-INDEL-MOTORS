import { DataTypes } from "sequelize";
import { sequelize } from "../db";
import { SpareGroup } from "./SpareGroup";
import { Unit } from "./Unit";



export const Spare = sequelize.define('spare', {

    id: {
        type: DataTypes.INTEGER,
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
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})

Spare.belongsTo(Unit,{foreignKey:'unit_id'})
Spare.belongsTo(SpareGroup,{foreignKey:'spareGroup_id'})