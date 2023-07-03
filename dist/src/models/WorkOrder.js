"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrder = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const OrderGroup_1 = require("./OrderGroup");
const Spare_1 = require("./Spare");
const Vehicle_1 = require("./Vehicle");
exports.WorkOrder = db_1.sequelize.define('work_order', {
    ot_number: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    observations: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
exports.WorkOrder.belongsTo(Vehicle_1.Vehicle, { foreignKey: 'license_vehicle' });
exports.WorkOrder.belongsTo(Spare_1.Spare, { foreignKey: 'spares_ids' });
exports.WorkOrder.belongsTo(OrderGroup_1.OrderGroup, { foreignKey: 'ot_type' });
//# sourceMappingURL=WorkOrder.js.map