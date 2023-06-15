"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Spare_1 = require("../controllers/Spare");
const routes = (0, express_1.Router)();
routes.get('/', Spare_1.getSpares);
//# sourceMappingURL=spares.js.map