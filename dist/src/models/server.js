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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const client_1 = __importDefault(require("../routes/client"));
const workOder_1 = __importDefault(require("../routes/workOder"));
const spare_1 = __importDefault(require("../routes/spare"));
const unit_1 = __importDefault(require("../routes/unit"));
const spareGroup_1 = __importDefault(require("../routes/spareGroup"));
const vehicle_1 = __importDefault(require("../routes/vehicle"));
class Server {
    constructor() {
        this.apiPaths = {
            accountsPath: '/api/account',
            workOrderPath: '/api/workorder',
            sparePath: '/api/spare',
            unitPath: '/api/unit',
            vehiclePath: '/api/vehicle'
        };
        this.app = (0, express_1.default)();
        this.port = '4000';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            //Cambiar el método sync por un método que sirve para pruebas que lo que hace es borrar la base de datos y ejecutar nuevamente
            yield db_1.sequelize.sync({ force: true });
        });
    }
    middlewares() {
        // this.app.use(cors())
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.accountsPath, client_1.default);
        this.app.use(this.apiPaths.workOrderPath, workOder_1.default);
        this.app.use(this.apiPaths.sparePath, spare_1.default);
        this.app.use(this.apiPaths.unitPath, unit_1.default);
        this.app.use(this.apiPaths.sparePath, spareGroup_1.default);
        this.app.use(this.apiPaths.vehiclePath, vehicle_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en el puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map