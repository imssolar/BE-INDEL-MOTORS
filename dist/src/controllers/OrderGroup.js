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
const Client_1 = require("../models/Client");
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
    const { id } = req.params;
    try {
        const order = yield OrderGroup_1.OrderGroup.findByPk(id);
        res.status(200).json(order);
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
        const order = yield OrderGroup_1.OrderGroup.create({ name });
        res.status(201).json({ order });
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
    const { id } = req.params;
    try {
        const order = yield Client_1.Client.findByPk(id);
        if (order) {
            order.update({ status: false });
        }
        res.status(200).json({ message: 'Order deleted!' });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.deleteOrderGroup = deleteOrderGroup;
const updateOrderGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        OrderGroup_1.OrderGroup.update({ name }, { where: { id } });
        res.status(200).json({ message: 'Client updated!' });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.updateOrderGroup = updateOrderGroup;
//# sourceMappingURL=OrderGroup.js.map