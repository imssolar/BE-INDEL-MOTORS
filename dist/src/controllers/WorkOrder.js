"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWorkOrder = exports.getWorkOrder = exports.getWorkOrders = void 0;
const WorkOrder_1 = require("../models/WorkOrder");
const sequelize_1 = require("sequelize");
const Spare_1 = require("../models/Spare");
const getWorkOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wo = yield WorkOrder_1.WorkOrder.findAll();
        res.status(200).json(wo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getWorkOrders = getWorkOrders;
const getWorkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const wo = yield WorkOrder_1.WorkOrder.findByPk(id);
        res.status(200).json(wo);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getWorkOrder = getWorkOrder;
const addWorkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { observations, ot_type, license_vehicle, spares_ids } = req.body;
    try {
        const workOrder = yield WorkOrder_1.WorkOrder.create({ observations, ot_type, license_vehicle });
        const spareInstances = yield Spare_1.Spare.findAll({ where: { id: spares_ids } });
        if (spareInstances.length !== spares_ids.length) {
            return res.status(400).json({ message: 'Algún repuesto no existe en la BD' });
        }
        const spareIds = spareInstances.map(spare => spare.id).filter((id) => id !== undefined);
        yield workOrder.addSpares(spareIds);
        res.status(201).json({ workOrder });
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            res.status(500).json({ message: error.errors[0].message });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.addWorkOrder = addWorkOrder;
//# sourceMappingURL=WorkOrder.js.map