"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Spare_1 = require("../controllers/Spare");
const routes = (0, express_1.Router)();
routes.get('/', Spare_1.getSpares);
routes.get('/:id', Spare_1.getSpare);
routes.post('/', Spare_1.addSpare);
routes.delete('/', Spare_1.deleteSpare);
routes.put('/:id', Spare_1.updateSpare);
exports.default = routes;
//# sourceMappingURL=spare.js.map