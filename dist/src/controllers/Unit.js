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
exports.updateUnit = exports.deleteUnit = exports.addUnit = exports.getUnit = exports.getUnits = void 0;
const Unit_1 = require("../models/Unit");
const getUnits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const units = yield Unit_1.Unit.findAll();
        res.status(200).json({ units });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getUnits = getUnits;
const getUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const unit = yield Unit_1.Unit.findByPk(id);
        res.status(200).json({ unit });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getUnit = getUnit;
const addUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name_unit, description } = req.body;
    try {
        const unitToCreate = yield Unit_1.Unit.create({ name_unit, description });
        res.status(200).json({ unitToCreate });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.addUnit = addUnit;
const deleteUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const unit = yield Unit_1.Unit.findByPk(id);
        if (unit) {
            unit.update({ status: false });
            res.status(200).json({ message: 'Unit updated!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteUnit = deleteUnit;
const updateUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name_unit, description } = req.body;
    try {
        Unit_1.Unit.update({ name_unit, description }, { where: { id } });
        res.status(200).json({ message: 'Client updated!' });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.updateUnit = updateUnit;
//# sourceMappingURL=Unit.js.map