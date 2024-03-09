"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('car_repair', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});
//# sourceMappingURL=index.js.map