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
exports.updateOrderGroup = exports.deleteOrderGroup = exports.addOrderGroup = exports.getOrderGroup = exports.getOrderGroups = void 0;
const sequelize_1 = require("sequelize");
const OrderGroup_1 = require("../models/OrderGroup");
const getOrderGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield OrderGroup_1.OrderGroup.findAll();
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOrderGroups = getOrderGroups;
const getOrderGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const isOrderGroupCreated = yield OrderGroup_1.OrderGroup.findOne({ where: { name } });
        if (!isOrderGroupCreated) {
            res.status(400).json({
                message: `El tipo de orden ${name} no se encuentra creada aún`,
                type: 'notFound',
            });
            return;
        }
        res.status(200).json(isOrderGroupCreated);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getOrderGroup = getOrderGroup;
/*CREAR OBJETO DE ERRORES
crear error personalizado
*/
const addOrderGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const isOrderGroupCreated = yield OrderGroup_1.OrderGroup.findOne({ where: { name } });
        if (isOrderGroupCreated) {
            res.status(400).json({
                message: `El tipo de orden ${name} ya se encuentra creada`,
                type: 'info',
            });
            return;
        }
        yield OrderGroup_1.OrderGroup.create({ name });
        res.status(201).json({
            message: `El tipo de orden con el nombre ${name} ha sido creado`,
            type: 'info',
        });
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
exports.addOrderGroup = addOrderGroup;
/*
    req.params---> parámetros que llegan en la url sin el signo ? . Ejemplo : localhost:4000/api/account/18740278-6
    req.query---> parámetros opciones, puede ser más de uno. Ejemplo : localhost:4000/api/account?rut=18740278-6
    para agregar otro sería el signo '&' y después signo de pregunta. localhost:4000/api/account?rut=18740278-6&nombre=ivan
    req.body--->  Lo que se envía cuando se hace un post o un update. El cuerpo del mensaje.
    req.headers
*/
const deleteOrderGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const isOrderGroupCreated = yield OrderGroup_1.OrderGroup.findOne({ where: { name } });
        if (!isOrderGroupCreated) {
            res.status(400).json({
                message: `El tipo de orden con el nombre ${name} no se encuentra creada`,
                type: 'error',
            });
            return;
        }
        yield isOrderGroupCreated.destroy();
        res
            .status(200)
            .json({
            message: `El tipo de orden con el nombre ${name} ha sido eliminada`,
            type: 'info',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.deleteOrderGroup = deleteOrderGroup;
const updateOrderGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const { name: nameOrderGroup } = req.body;
    try {
        const isOrderGroupCreated = yield OrderGroup_1.OrderGroup.findOne({ where: { name } });
        if (!isOrderGroupCreated) {
            res.status(400).json({
                message: `El tipo de orden con el nombre ${name} no se encuentra creada`,
                type: 'error',
            });
            return;
        }
        OrderGroup_1.OrderGroup.update({ name: nameOrderGroup }, { where: { name } });
        res.status(200).json({ message: `El tipo de orden con el nombre ${name} ha sido actualizada` });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.updateOrderGroup = updateOrderGroup;
//# sourceMappingURL=OrderGroup.js.map