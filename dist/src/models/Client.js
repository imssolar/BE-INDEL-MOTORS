"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.Client = db_1.sequelize.define('client', {
    rut: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    names: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    surnames: {
        type: sequelize_1.DataTypes.STRING,
    },
    cellphone_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    district: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    status_description: {
        type: sequelize_1.DataTypes.STRING
    }
    /*agregar status y una descripcion*/
}, {
    //Por cada registro, si es timestaps es true, te crea columnas como created_date, modified_date
    timestamps: false
});
/*
Tabla1.belongsTo(Tabla2, {
    foreignKey: 'tabla2Id',
    sourceKey: 'id'
})

Tabla2.hasMany(Tabla1, {
    foreignKey: 'tabla1id',
    sourceKey: 'id'
})

*/
//# sourceMappingURL=Client.js.map