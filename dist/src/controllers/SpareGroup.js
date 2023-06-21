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
const getSpareGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { id } = req.params;
    console.log(id);
    try {
        const group = yield SpareGroup_1.SpareGroup.findByPk(id);
        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getSpareGroup = getSpareGroup;
const addSpareGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const group = yield SpareGroup_1.SpareGroup.create({ name, description });
        res.status(201).json({ group });
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
    const { id } = req.params;
    try {
        const group = yield SpareGroup_1.SpareGroup.findByPk(id);
        if (group) {
            group.update({ status: false });
        }
        res.status(200).json({ message: "Spare group deleted!" });
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
});
exports.deleteSpareGroup = deleteSpareGroup;
const updateSpareGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        SpareGroup_1.SpareGroup.update({ name, description }, { where: { id } });
        res.status(200).json({ message: "Spare group updated!" });
    }
    catch (error) {
        res.status(500).json({ message: "error" });
    }
});
exports.updateSpareGroup = updateSpareGroup;
//# sourceMappingURL=SpareGroup.js.map