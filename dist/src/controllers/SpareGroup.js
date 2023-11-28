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
exports.updateSpareGroup = exports.deleteSpareGroup = exports.addSpareGroup = exports.getSpareGroup = exports.getSpareGroups = void 0;
const SpareGroup_1 = require("../models/SpareGroup");
const sequelize_1 = require("sequelize");
const getSpareGroups = (res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getSparegroups');
    try {
        const sparesGroup = yield SpareGroup_1.SpareGroup.findAll();
        res.status(200).json(sparesGroup);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getSpareGroups = getSpareGroups;
const getSpareGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    console.log(name);
    try {
        const sparegroup = yield SpareGroup_1.SpareGroup.findOne({
            where: { name: `${name}` },
        });
        if (!sparegroup) {
            res.status(400).json({
                message: `El grupo de repuesto con el nombre ${name} no se encuentra en la base de datos`,
                type: 'notFound',
            });
            return;
        }
        res.status(200).json(sparegroup);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getSpareGroup = getSpareGroup;
const addSpareGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        //Esto debe ser mayuscula o minuscula
        const isSpareGroupCreated = yield SpareGroup_1.SpareGroup.findOne({
            where: { name: `${name}` },
        });
        if (isSpareGroupCreated) {
            res.status(400).json({
                message: `El grupo de repuesto con el nombre ${name} ya se encuentra creado`,
                type: 'error',
            });
            return;
        }
        const group = yield SpareGroup_1.SpareGroup.create({ name, description });
        res.status(201).json({
            message: 'Grupo de repuesto creado correctamente',
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
exports.addSpareGroup = addSpareGroup;
const deleteSpareGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: nameGroup } = req.params;
    try {
        const isSpareGroupCreated = yield SpareGroup_1.SpareGroup.findOne({
            where: { name: nameGroup },
        });
        console.log(isSpareGroupCreated);
        if (!isSpareGroupCreated) {
            res.status(400).json({
                message: `El grupo de repuesto con el nombre ${nameGroup} no está  creado, por lo tanto, no es posible eliminarlo`,
                type: 'info',
            });
        }
        isSpareGroupCreated === null || isSpareGroupCreated === void 0 ? void 0 : isSpareGroupCreated.destroy();
        res.status(200).json({
            message: `El grupo de repuesto con el nombre ${nameGroup} ha sido eliminado`,
            type: 'info',
        });
    }
    catch (error) {
        // res.status(500).json({ message: error.message })
        console.log('error delete', error);
    }
});
exports.deleteSpareGroup = deleteSpareGroup;
const updateSpareGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: nameGroup } = req.params;
    const { name, description } = req.body;
    try {
        const isSpareGroupCreated = yield SpareGroup_1.SpareGroup.findOne({
            where: { name: nameGroup },
        });
        if (!isSpareGroupCreated) {
            res.status(400).json({
                message: `El grupo de repuesto ${nameGroup} no se encuentra creado aún`,
                type: 'info',
            });
            return;
        }
        SpareGroup_1.SpareGroup.update({ name, description }, { where: { name: nameGroup } });
        res.status(200).json({
            message: `El grupo de repuesto con el nombre ${nameGroup} ha sido actualizado`,
            type: 'info',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.updateSpareGroup = updateSpareGroup;
//# sourceMappingURL=SpareGroup.js.map