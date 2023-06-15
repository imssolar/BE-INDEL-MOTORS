"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spare = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.Spare = db_1.sequelize.define('spare', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    /*Esto debe estar ligado a una tabla Unidad o tipo de unidad*/
    unit: {
        type: sequelize_1.DataTypes.STRING
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    /*Esto debe estar ligado a una tabla grupo*/
    group: {
        type: sequelize_1.DataTypes.STRING
    }
});
//# sourceMappingURL=Spare.js.map