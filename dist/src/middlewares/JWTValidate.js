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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const validateJWT = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = request.header('x-token');
    if (!token)
        return response.status(400).json({ message: 'No hay token' });
    const secret = (_a = process.env.SECRET_JWT) !== null && _a !== void 0 ? _a : '';
    try {
        const verifyJWT = jsonwebtoken_1.default.verify(token, secret);
        const verifyUser = yield User_1.User.findByPk(verifyJWT.id);
        //crear objeto custom y enviar solo lo de datavalues (sin password ni los created)
        if (!verifyUser)
            return response.status(401).json({ message: 'Usuario no encontrado!' });
        request.user = verifyUser;
        next();
    }
    catch (error) {
        console.log(error);
        response.status(401).json({ error: error.message });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=JWTValidate.js.map