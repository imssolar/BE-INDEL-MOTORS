"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderGroup = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.OrderGroup = db_1.sequelize.define("order_group", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
//# sourceMappingURL=OrderGroup.js.map