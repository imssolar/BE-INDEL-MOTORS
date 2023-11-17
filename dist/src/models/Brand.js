"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.Brand = db_1.sequelize.define('brand', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
//# sourceMappingURL=Brand.js.map