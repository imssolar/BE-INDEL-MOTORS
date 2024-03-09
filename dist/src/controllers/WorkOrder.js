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
exports.addWorkOrder = exports.updateWorkOrder = exports.getWorkOrderByOtNumber = exports.getWorkOrder = exports.getWorkOrders = void 0;
const WorkOrder_1 = require("../models/WorkOrder");
const sequelize_1 = require("sequelize");
const Spare_1 = require("../models/Spare");
const OrderGroup_1 = require("../models/OrderGroup");
const validateSpareStock = (spares) => __awaiter(void 0, void 0, void 0, function* () {
    const resValidate = [];
    for (const spare of spares) {
        const spareValue = yield Spare_1.Spare.findByPk(spare.id);
        if (spareValue && spareValue.stock - spare.stock < 0) {
            //No sería posible utilizar este repuesto ya que no tiene stock
            const obj = {
                name: spareValue.name,
                currentStock: spareValue.stock,
                stockThatINeed: Math.abs(spareValue.stock - spare.stock),
                requestedStock: spareValue.stock + Math.abs(spareValue.stock - spare.stock),
            };
            resValidate.push(obj);
        }
    }
    return resValidate;
});
const substractStock = (spares) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    for (const spare of spares) {
        const spareFound = yield Spare_1.Spare.findByPk(spare.id);
        spareFound.stock = spareFound.stock < 0
            ? spareFound.stock + Math.abs(spare.stock)
            : spareFound.stock - ((_a = spare.stock) !== null && _a !== void 0 ? _a : 0);
        yield (spareFound === null || spareFound === void 0 ? void 0 : spareFound.save());
    }
});
const getWorkOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wo = yield WorkOrder_1.WorkOrder.findAll({
            include: { model: Spare_1.Spare, as: 'spares' },
        });
        res.status(200).json(wo);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getWorkOrders = getWorkOrders;
const getWorkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const findWorkOrder = yield WorkOrder_1.WorkOrder.findAll({
            where: { license_vehicle: id },
        });
        res.status(200).json(findWorkOrder);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getWorkOrder = getWorkOrder;
const getWorkOrderByOtNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const workOrder = yield WorkOrder_1.WorkOrder.findByPk(id);
        if (!workOrder) {
            return res.status(404).json({
                message: 'No se encontró la orden de trabajo',
                type: 'notFound',
            });
        }
        const otType = yield OrderGroup_1.OrderGroup.findByPk(workOrder.ot_type);
        const otTypeProps = (otType === null || otType === void 0 ? void 0 : otType.id) + '-' + (otType === null || otType === void 0 ? void 0 : otType.name);
        const spares = yield workOrder.getSpares();
        console.log('ubicando spares' + spares);
        const obj = { workOrder, spares, otTypeProps };
        return res.status(200).json(obj);
    }
    catch (error) { }
});
exports.getWorkOrderByOtNumber = getWorkOrderByOtNumber;
const updateWorkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { observations, ot_type, license_vehicle, spares } = req.body;
    const { id } = req.params;
    /**
   * Validar el stock de repuestos antes de la creación
   * En el caso de que el stock sea mayor o igual, descontarlo y continuar con la creación
   * en caso contrario arrojar error al usuario
   *
   */
    const workOrder = yield WorkOrder_1.WorkOrder.findByPk(id);
    console.log('workOrder', workOrder);
    const spares_ids = spares.map((ids) => ids.id);
    try {
        const spareInstances = yield Spare_1.Spare.findAll({
            where: { code_id: spares_ids },
        });
        if (spareInstances.length !== spares_ids.length) {
            return res
                .status(400)
                .json({ message: 'Algún repuesto no existe en la BD' });
        }
        //Validar si tengo stock de todos los repuestos
        const sparesWithoutStock = yield validateSpareStock(spares);
        if (sparesWithoutStock.length > 0) {
            return res.status(400).json({
                sparesWithoutStock,
                message: 'No se pudo crear la orden de trabajo debido a falta de stock de algún(s) repuestos',
                type: 'outStock',
            });
        }
        //TODO: Queda validar que cuando se actualice el stock se actualice tambien en la WO
        yield substractStock(spares);
        const workOrder = yield WorkOrder_1.WorkOrder.update({
            observations,
            ot_type,
            license_vehicle,
        }, { where: { ot_number: id } });
        // const spareIds = spareInstances
        //   .map((spare) => spare.code_id)
        //   .filter((id): id is string => id !== undefined);
        // await (workOrder as WorkOrderInstance).addSpares(spareIds);
        res.status(200).json({ workOrder });
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
exports.updateWorkOrder = updateWorkOrder;
const addWorkOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { observations, ot_type, license_vehicle, spares, is_confirmed, is_payment, } = req.body;
    const { id } = req.params;
    const spares_ids = spares.map((ids) => ids.id);
    try {
        const spareInstances = yield Spare_1.Spare.findAll({
            where: { code_id: spares_ids },
        });
        if (spareInstances.length !== spares_ids.length) {
            return res
                .status(400)
                .json({ message: 'Algún repuesto no existe en la BD' });
        }
        const sparesWithoutStock = yield validateSpareStock(spares);
        if (sparesWithoutStock.length > 0) {
            return res.status(400).json({
                sparesWithoutStock,
                message: 'No se pudo crear la orden de trabajo debido a falta de stock de algún(s) repuestos',
                type: 'outStock',
            });
        }
        if (is_confirmed) {
            console.log('La orden está confirmada y se procede a restar el stock');
            yield substractStock(spares);
            // const workOrder = await WorkOrder.update(
            //   {
            //     observations,
            //     ot_type,
            //     license_vehicle,
            //     is_confirmed,
            //     is_payment,
            //   },
            //   { where: { ot_number: id } }
            // );
        }
        const arrayMaps = spares
            .map((spare) => `${spare.id},${spare.stock}`)
            .join('|');
        const workOrder = yield WorkOrder_1.WorkOrder.create({
            observations,
            ot_type,
            license_vehicle,
            is_confirmed,
            is_payment,
            spares_stock: arrayMaps,
        });
        const spareIds = spareInstances
            .map((spare) => spare.code_id)
            .filter((id) => id !== undefined);
        yield workOrder.addSpares(spareIds);
        res.status(201).json({ workOrder });
    }
    catch (error) { }
});
exports.addWorkOrder = addWorkOrder;
//# sourceMappingURL=WorkOrder.js.map