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
exports.updateSpare = exports.deleteSpare = exports.addSpare = exports.getSpare = exports.getSpares = void 0;
const Spare_1 = require("../models/Spare");
const getSpares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spares = Spare_1.Spare.findAll();
        res.status(200).json(spares);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getSpares = getSpares;
const getSpare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const spare = Spare_1.Spare.findByPk(id);
        res.status(200).json(spare);
    }
    catch (error) {
    }
});
exports.getSpare = getSpare;
const addSpare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cost, stock } = req.body;
    try {
        const newSpare = yield Spare_1.Spare.create({ name, cost, stock });
        res.status(200).json({ newSpare });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.addSpare = addSpare;
const deleteSpare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const spareToDelete = yield Spare_1.Spare.findByPk(id);
        if (spareToDelete) {
            spareToDelete.update({ status: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteSpare = deleteSpare;
const updateSpare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, cost, stock } = req.body;
    try {
        Spare_1.Spare.update({ name, cost, stock }, { where: { id } });
        res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.updateSpare = updateSpare;
//# sourceMappingURL=Spare.js.map