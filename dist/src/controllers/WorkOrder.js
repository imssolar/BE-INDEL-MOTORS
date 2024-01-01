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
exports.getWorkOrder = exports.getWorkOrders = void 0;
const WorkOrder_1 = require("../models/WorkOrder");
const Spare_1 = require("../models/Spare");
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
    for (const spare of spares) {
        const spareFound = yield Spare_1.Spare.findByPk(spare.id);
        spareFound.stock -= spare.stock;
        yield (spareFound === null || spareFound === void 0 ? void 0 : spareFound.save());
    }
});
const getWorkOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wo = yield WorkOrder_1.WorkOrder.findAll({
            include: { model: Spare_1.Spare, as: "spares" },
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
// export const addWorkOrder = async (req: Request, res: Response) => {
//   const { observations, ot_type, license_vehicle, spares } = req.body;
//   /**
//    * Validar el stock de repuestos antes de la creación
//    * En el caso de que el stock sea mayor o igual, descontarlo y continuar con la creación
//    * en caso contrario arrojar error al usuario
//    *
//    */
//   const spares_ids = spares.map((ids: any) => ids.id);
//   try {
//     const spareInstances = await Spare.findAll({ where: { id: spares_ids } });
//     if (spareInstances.length !== spares_ids.length) {
//       return res
//         .status(400)
//         .json({ message: "Algún repuesto no existe en la BD" });
//     }
//     //Validar si tengo stock de todos los repuestos
//     const sparesWithoutStock = await validateSpareStock(spares);
//     if (sparesWithoutStock.length > 0) {
//       return res.status(400).json({
//         sparesWithoutStock,
//         message:
//           "No se pudo crear la orden de trabajo debido a falta de stock de algún(s) repuestos",
//         type: "outStock",
//       });
//     }
//     //Descontar stock de todos los repuestos necesarios
//     await substractStock(spares);
//     const workOrder = await WorkOrder.create({
//       observations,
//       ot_type,
//       license_vehicle,
//     });
//     const spareIds = spareInstances
//       .map((spare) => spare.id)
//       .filter((id): id is number => id !== undefined);
//     await (workOrder as WorkOrderInstance).addSpares(spareIds);
//     res.status(201).json({ workOrder });
//   } catch (error: any) {
//     if (error instanceof SequelizeValidationError) {
//       res.status(500).json({ message: error.errors[0].message });
//     } else {
//       res.status(500).json({ message: error.message });
//     }
//   }
// };
//# sourceMappingURL=WorkOrder.js.map