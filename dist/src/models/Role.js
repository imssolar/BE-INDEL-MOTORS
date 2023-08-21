"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.Role = db_1.sequelize.define('role', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    enabled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
//# sourceMappingURL=Role.js.map