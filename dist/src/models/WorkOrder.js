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
        autoIncrement: true,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    observations: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_confirmed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_payment: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    spares_stock: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: ''
    }
});
exports.WorkOrder.belongsTo(Vehicle_1.Vehicle, { foreignKey: 'license_vehicle' });
// WorkOrder.belongsTo(Spare, { foreignKey: 'spares_ids' })
exports.WorkOrder.hasMany(Spare_1.Spare, { foreignKey: 'workOrderId', as: 'spares_ids' });
exports.WorkOrder.belongsTo(OrderGroup_1.OrderGroup, { foreignKey: 'ot_type' });
/*Tratar de cambiar nombre a minúscula*/
exports.WorkOrder.belongsToMany(Spare_1.Spare, { as: 'spares', through: 'workorderspare' });
Spare_1.Spare.belongsToMany(exports.WorkOrder, { as: 'orders', through: 'workorderspare' });
//# sourceMappingURL=WorkOrder.js.map