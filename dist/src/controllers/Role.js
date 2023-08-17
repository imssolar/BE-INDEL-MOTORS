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
exports.updateRole = exports.deleteRole = exports.addRole = exports.getRole = exports.getRoles = void 0;
const Role_1 = require("../models/Role");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.Role.findAll();
        res.status(200).json(roles);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getRoles = getRoles;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const role = yield Role_1.Role.findByPk(id);
        res.status(200).json(role);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getRole = getRole;
const addRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const role = yield Role_1.Role.create({ name, description });
        res.status(201).json(role);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.addRole = addRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const role = yield Role_1.Role.findByPk(id);
        if (role) {
            role.update({ enabled: false });
        }
        res.status(202).json({ message: 'Role disabled' });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteRole = deleteRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const role = yield Role_1.Role.update({ name, description }, { where: { id } });
        res.status(200).json(role);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateRole = updateRole;
//# sourceMappingURL=Role.js.map