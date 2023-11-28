"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderGroup_1 = require("../controllers/OrderGroup");
const routes = (0, express_1.Router)();
routes.get('/', OrderGroup_1.getOrderGroups);
routes.get('/:name', OrderGroup_1.getOrderGroup);
routes.post('/', OrderGroup_1.addOrderGroup);
routes.delete('/:name', OrderGroup_1.deleteOrderGroup);
routes.put('/:name', OrderGroup_1.updateOrderGroup);
exports.default = routes;
//# sourceMappingURL=orderGroup.js.map