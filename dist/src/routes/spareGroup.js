"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SpareGroup_1 = require("../controllers/SpareGroup");
const routes = (0, express_1.Router)();
routes.get('/', SpareGroup_1.getSpareGroups);
routes.get('/:name', SpareGroup_1.getSpareGroup);
routes.post('/', SpareGroup_1.addSpareGroup);
routes.delete('/', SpareGroup_1.deleteSpareGroup);
routes.put('/:id', SpareGroup_1.updateSpareGroup);
exports.default = routes;
//# sourceMappingURL=spareGroup.js.map