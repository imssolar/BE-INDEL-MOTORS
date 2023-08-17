"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Role_1 = require("../controllers/Role");
const routes = (0, express_1.Router)();
routes.get('/', Role_1.getRoles);
routes.get('/:id', Role_1.getRole);
routes.post('/', Role_1.addRole);
routes.delete('/:id', Role_1.deleteRole);
routes.put('/:id', Role_1.updateRole);
exports.default = routes;
//# sourceMappingURL=role.js.map