"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spare = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const SpareGroup_1 = require("./SpareGroup");
const Unit_1 = require("./Unit");
exports.Spare = db_1.sequelize.define('spare', {
    code_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cost: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
});
exports.Spare.belongsTo(Unit_1.Unit, { foreignKey: 'unit_id' });
exports.Spare.belongsTo(SpareGroup_1.SpareGroup, { foreignKey: 'spareGroup_id' });
// Spare.belongsToMany(WorkOrder, {
//     through: 'spare',
//     foreignKey: 'item_id'
//   });
//# sourceMappingURL=Spare.js.map