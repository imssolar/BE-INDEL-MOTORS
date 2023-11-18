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
exports.addBrand = exports.getBrandByName = exports.getBrandByID = exports.getBrands = void 0;
const Brand_1 = require("../models/Brand");
const getBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBrands = yield Brand_1.Brand.findAll();
        res.status(200).json(allBrands);
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: 'error' });
    }
});
exports.getBrands = getBrands;
const getBrandByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const brand = yield Brand_1.Brand.findByPk(id);
        if (!brand) {
            res.status(404).json({
                message: 'La marca de vehículo no se encuentra en la base de datos',
                type: 'notFound',
            });
            return;
        }
        res.status(200).json(brand);
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: 'error' });
    }
});
exports.getBrandByID = getBrandByID;
const getBrandByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const brandByName = yield Brand_1.Brand.findOne({
            where: { name: `${name}` },
        });
        if (!brandByName) {
            res.status(400).json({
                message: `La marca ${name} no se encuentra en la base de datos`,
                type: 'notFound',
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: 'error' });
    }
});
exports.getBrandByName = getBrandByName;
const addBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const isBrandCreated = yield Brand_1.Brand.findOne({
            where: { name: `${name}` },
        });
        if (isBrandCreated) {
            res
                .status(400)
                .json({
                message: `La marca ${name} ya se encuentra creada`,
                type: 'error',
            });
            return;
        }
        const createBrand = yield Brand_1.Brand.create({ name });
        res
            .status(201)
            .json({ message: 'Marca creada correctamente', type: 'info' });
    }
    catch (error) {
        res.status(500).json({ message: error.message, type: 'error' });
    }
});
exports.addBrand = addBrand;
//# sourceMappingURL=Brand.js.map