"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const Client_1 = require("./Client");
exports.Vehicle = db_1.sequelize.define('vehicle', {
    license_plate: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
    },
    brand: {
        type: sequelize_1.DataTypes.STRING,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
    },
    year_production: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    vin_number: {
        type: sequelize_1.DataTypes.STRING,
    },
});
exports.Vehicle.belongsTo(Client_1.Client, { foreignKey: 'rut_client' });
//# sourceMappingURL=Vehicle.js.map