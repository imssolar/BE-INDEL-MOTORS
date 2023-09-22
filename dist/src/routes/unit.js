"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Unit_1 = require("../controllers/Unit");
const routes = (0, express_1.Router)();
/**
 * @swagger
 * /api/unit/:
 *   get:
 *     summary: Obtiene las unidades.
 *     responses:
 *       '200':
 *         description: OK.
 */
routes.get('/', Unit_1.getUnits);
routes.get('/:id', Unit_1.getUnit);
routes.post('/', Unit_1.addUnit);
routes.delete('/', Unit_1.deleteUnit);
routes.put('/:id', Unit_1.updateUnit);
exports.default = routes;
//# sourceMappingURL=unit.js.map