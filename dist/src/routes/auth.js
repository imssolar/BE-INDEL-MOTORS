"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const routes = (0, express_1.Router)();
routes.post('/login', Auth_1.Login);
exports.default = routes;
//# sourceMappingURL=auth.js.map