"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Client_1 = require("../controllers/Client");
const JWTValidate_1 = require("../middlewares/JWTValidate");
//routes puede tener más de dos parámetros, el primero siempre será el path(ruta) y el segundo puede ser un array de middlewares
const routes = (0, express_1.Router)();
routes.get('/', Client_1.getClients);
routes.get('/:rut', Client_1.getClient);
routes.post('/', [JWTValidate_1.validateJWT], Client_1.addClient);
routes.delete('/:rut', Client_1.deleteClient);
routes.put('/:rut', Client_1.updateClient);
exports.default = routes;
//# sourceMappingURL=client.js.map