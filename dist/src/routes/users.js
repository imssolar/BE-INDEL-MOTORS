"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const routes = (0, express_1.Router)();
routes.get('/', User_1.getUsers);
routes.get('/:id', User_1.getUser);
routes.post('/', User_1.addUser);
routes.delete('/:id', User_1.deleteUser);
routes.put('/:id', User_1.updateUser);
exports.default = routes;
//# sourceMappingURL=users.js.map