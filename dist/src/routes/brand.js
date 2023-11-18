"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Brand_1 = require("../controllers/Brand");
const routes = (0, express_1.Router)();
routes.get('/', Brand_1.getBrands);
routes.get('/:id', Brand_1.getBrandByID);
routes.get('/:name', Brand_1.getBrandByName);
routes.post('/', Brand_1.addBrand);
exports.default = routes;
//# sourceMappingURL=brand.js.map