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
exports.updateUser = exports.deleteUser = exports.addUser = exports.getUser = exports.getUsers = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.User.findByPk(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getUser = getUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, password, email, roleName } = req.body;
    try {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const encryptPassword = bcryptjs_1.default.hashSync(password, salt);
        const user = yield User_1.User.create({ name, last_name, password: encryptPassword, email, roleName });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.addUser = addUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.User.findByPk(id);
        if (user) {
            user.update({ enabled: false });
        }
        res.status(200).json({ message: 'User deleted!' });
    }
    catch (error) {
        res.status(500).json({ message: 'error' });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, last_name, password, email } = req.body;
    try {
        const user = yield User_1.User.update({ name, last_name, password, email }, { where: { email: id } });
        res.status(200).json(user);
    }
    catch (error) {
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=User.js.map