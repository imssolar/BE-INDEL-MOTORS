"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('carRepair', 'postgres', '1125', {
    host: 'localhost',
    dialect: 'postgres'
});
//# sourceMappingURL=index.js.map