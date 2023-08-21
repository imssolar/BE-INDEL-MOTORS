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
exports.Login = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const findUser = yield User_1.User.findByPk(email);
        if (!findUser) {
            return res.status(400).json({ message: "El email no está registrado" });
        }
        const isValidPassword = bcryptjs_1.default.compareSync(password, findUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "El password es incorrecto" });
        }
        return res.status(200).json({ message: "Login exitoso" });
    }
    catch (error) {
    }
});
exports.Login = Login;
//# sourceMappingURL=Auth.js.map