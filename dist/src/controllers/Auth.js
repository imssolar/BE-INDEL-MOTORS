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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByToken = exports.Login = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJWT_1 = require("../utils/generateJWT");
const express_validator_1 = require("express-validator");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkErrors = (0, express_validator_1.validationResult)(req);
    if (!checkErrors.isEmpty()) {
        const mapErrors = checkErrors.array();
        return res.status(400).json({ errores: mapErrors });
    }
    const { email, password: pass } = req.body;
    try {
        const findUser = yield User_1.User.findByPk(email);
        if (!findUser) {
            return res.status(400).json({ message: 'El email no está registrado' });
        }
        const isValidPassword = bcryptjs_1.default.compareSync(pass, findUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'El password es incorrecto' });
        }
        const generateResponse = yield (0, generateJWT_1.generateJWT)(findUser.email);
        const { name, last_name, email: email_user, roleName, enabled } = findUser;
        return res
            .status(200)
            .json({
            message: 'Login exitoso',
            token: generateResponse,
            user: { name, last_name, email: email_user, roleName, enabled },
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Login = Login;
const getUserByToken = (req) => {
    console.log(req);
};
exports.getUserByToken = getUserByToken;
//# sourceMappingURL=Auth.js.map