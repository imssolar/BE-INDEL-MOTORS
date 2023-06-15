"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpareGroup = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.SpareGroup = db_1.sequelize.define('spare_group', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
//# sourceMappingURL=SpareGroup.js.map