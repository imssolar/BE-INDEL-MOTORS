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
exports.agregarHerramienta = exports.obtenerHerramientas = void 0;
const Herramienta_1 = require("../models/Herramienta");
const obtenerHerramientas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todasLasHerramientas = yield Herramienta_1.Herramienta.findAll();
        return res.status(200).json(todasLasHerramientas);
    }
    catch (error) { }
});
exports.obtenerHerramientas = obtenerHerramientas;
const agregarHerramienta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, fecha_compra } = req.body;
    console.log(nombre);
    console.log(fecha_compra);
    try {
        const nuevaHerramienta = yield Herramienta_1.Herramienta.create({ nombre, fecha_compra });
        res.status(201).json({ nuevaHerramienta, message: "Herramienta creada con éxito" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.agregarHerramienta = agregarHerramienta;
//# sourceMappingURL=Herramienta.js.map