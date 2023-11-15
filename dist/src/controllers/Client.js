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
exports.updateClient = exports.deleteClient = exports.addClient = exports.getClient = exports.getClients = void 0;
const sequelize_1 = require("sequelize");
const Client_1 = require("../models/Client");
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get clients");
    try {
        const clients = yield Client_1.Client.findAll();
        res.status(200).json(clients);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getClients = getClients;
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    try {
        const client = yield Client_1.Client.findByPk(rut);
        if (!client) {
            const resp = {
                message: "El cliente no se encuentra en la base de datos",
                type: "notFound",
            };
            res.status(200).json(resp);
            return;
        }
        res.status(200).json({ client });
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: "error" });
    }
});
exports.getClient = getClient;
/*CREAR OBJETO DE ERRORES
crear error personalizado
*/
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut, names, surnames, cellphone_number, address, district, email } = req.body;
    try {
        const findClient = yield Client_1.Client.findByPk(rut);
        if (findClient) {
            res.status(400).json({
                message: `El cliente con el rut ${rut} ya se encuentra en la base de datos`,
                type: "error",
            });
            return;
        }
        const client = yield Client_1.Client.create({
            rut,
            names,
            surnames,
            cellphone_number,
            district,
            address,
            email,
        });
        res
            .status(201)
            .json({ message: "Cliente creado correctamente", type: "info" });
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            res.status(500).json({ message: error.errors[0].message });
        }
        else {
            res.status(500).json({ message: error.message, type: "error" });
        }
    }
});
exports.addClient = addClient;
/*
    req.params---> parámetros que llegan en la url sin el signo ? . Ejemplo : localhost:4000/api/account/18740278-6
    req.query---> parámetros opciones, puede ser más de uno. Ejemplo : localhost:4000/api/account?rut=18740278-6
    para agregar otro sería el signo '&' y después signo de pregunta. localhost:4000/api/account?rut=18740278-6&nombre=ivan
    req.body--->  Lo que se envía cuando se hace un post o un update. El cuerpo del mensaje.
    req.headers
*/
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    try {
        const client = yield Client_1.Client.findByPk(rut);
        if (!client) {
            res.status(400).json({
                message: "El cliente a eliminar no se encuentra en la base de datos",
                type: "error",
            });
            return;
        }
        client.destroy();
        res.status(200).json({
            message: `El cliente con el rut ${client.rut} ha sido eliminado`,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: "error" });
    }
});
exports.deleteClient = deleteClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    const { names, surnames, cellphone_number, address, district, email } = req.body;
    try {
        const client = yield Client_1.Client.findByPk(rut);
        if (!client) {
            res.status(400).json({
                message: "El cliente no se encuentra en la base de datos",
                type: "error",
            });
            return;
        }
        Client_1.Client.update({ names, surnames, cellphone_number, address, district, email }, { where: { rut } });
        res
            .status(200)
            .json({
            message: `El cliente con el rut ${rut} ha sido actualizado correctamente`,
            type: "info",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: "error" });
    }
});
exports.updateClient = updateClient;
//# sourceMappingURL=Client.js.map