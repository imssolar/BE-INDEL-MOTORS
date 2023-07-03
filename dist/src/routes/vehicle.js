"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vehicle_1 = require("../controllers/Vehicle");
//routes puede tener más de dos parámetros, el primero siempre será el path(ruta) y el segundo puede ser un array de middlewares
const routes = (0, express_1.Router)();
routes.get('/', Vehicle_1.getVehicles);
routes.get('/:license_plate', Vehicle_1.getVehicle);
routes.post('/', Vehicle_1.addVehicle);
routes.delete('/:license_plate', Vehicle_1.deleteVehicle);
routes.put('/:license_plate', Vehicle_1.updateVehicle);
exports.default = routes;
//# sourceMappingURL=vehicle.js.map