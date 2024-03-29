"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WorkOrder_1 = require("../controllers/WorkOrder");
const router = (0, express_1.Router)();
router.get('/', WorkOrder_1.getWorkOrders);
router.get('/:id', WorkOrder_1.getWorkOrder);
router.get('/otnumber/:id', WorkOrder_1.getWorkOrderByOtNumber);
router.post('/', WorkOrder_1.addWorkOrder);
router.put('/:id', WorkOrder_1.updateWorkOrder);
exports.default = router;
//# sourceMappingURL=workOder.js.map