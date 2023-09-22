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
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const secret = (_a = process.env.SECRET_JWT) !== null && _a !== void 0 ? _a : "";
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: '1d' }, (error, token) => {
            if (error)
                return reject(error);
            resolve(token);
        });
    });
});
exports.generateJWT = generateJWT;
//# sourceMappingURL=generateJWT.js.map