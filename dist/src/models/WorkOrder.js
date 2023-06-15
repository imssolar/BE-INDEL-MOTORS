"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrder = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.WorkOrder = db_1.sequelize.define('work_order', {
    ppu: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    ot_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    observations: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    ot_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
//# sourceMappingURL=WorkOrder.js.map