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
exports.updateVehicle = exports.deleteVehicle = exports.addVehicle = exports.getVehicle = exports.getVehicles = void 0;
const Vehicle_1 = require("../models/Vehicle");
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get vehicles');
    try {
        const vehicles = yield Vehicle_1.Vehicle.findAll();
        res.status(200).json({ vehicles });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getVehicles = getVehicles;
const getVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license_plate } = req.params;
    console.log('id vehiculo', license_plate);
    try {
        const vehicle = yield Vehicle_1.Vehicle.findByPk(license_plate);
        res.status(200).json(vehicle);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.getVehicle = getVehicle;
const addVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license_plate, brand, model, year_production, vin_number } = req.body;
    try {
        const vehicleToCreate = yield Vehicle_1.Vehicle.create({ license_plate, brand, model, year_production, vin_number });
        res.status(200).json({ vehicleToCreate });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.addVehicle = addVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license_plate } = req.params;
    try {
        const vehicle = yield Vehicle_1.Vehicle.findByPk(license_plate);
        if (vehicle) {
            vehicle.update({ status: false });
            res.status(200).json({ message: 'vehicle updated!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deleteVehicle = deleteVehicle;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license_plate } = req.params;
    const { brand, model, year_production, vin_number } = req.body;
    try {
        Vehicle_1.Vehicle.update({ license_plate, brand, model, year_production, vin_number }, { where: { license_plate } });
        res.status(200).json({ message: 'Vehicle updated!' });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.updateVehicle = updateVehicle;
//# sourceMappingURL=Vehicle.js.map