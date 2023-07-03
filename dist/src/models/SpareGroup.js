"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpareGroup = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.SpareGroup = db_1.sequelize.define('spare_group', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
//# sourceMappingURL=SpareGroup.js.map