"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.Unit = db_1.sequelize.define('unit', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name_unit: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
//# sourceMappingURL=Unit.js.map