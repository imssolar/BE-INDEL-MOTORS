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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const client_1 = __importDefault(require("../routes/client"));
const workOder_1 = __importDefault(require("../routes/workOder"));
const spare_1 = __importDefault(require("../routes/spare"));
const unit_1 = __importDefault(require("../routes/unit"));
const spareGroup_1 = __importDefault(require("../routes/spareGroup"));
const vehicle_1 = __importDefault(require("../routes/vehicle"));
const orderGroup_1 = __importDefault(require("../routes/orderGroup"));
const users_1 = __importDefault(require("../routes/users"));
const role_1 = __importDefault(require("../routes/role"));
const auth_1 = __importDefault(require("../routes/auth"));
const brand_1 = __importDefault(require("../routes/brand"));
const cors_1 = __importDefault(require("cors"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'doc',
        },
    },
    apis: ['./src/routes/*.ts'],
};
class Server {
    constructor() {
        this.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
        this.apiPaths = {
            accountsPath: '/api/account',
            workOrderPath: '/api/workorder',
            sparePath: '/api/spare',
            unitPath: '/api/unit',
            vehiclePath: '/api/vehicle',
            orderGroupPath: '/api/ordergroup',
            spareGroupPath: '/api/spareGroup',
            userPath: '/api/user',
            rolePath: '/api/role',
            authPath: '/api/auth',
            brandPath: '/api/brand'
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
            yield db_1.sequelize.sync();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.apiPaths.accountsPath, client_1.default);
        this.app.use(this.apiPaths.workOrderPath, workOder_1.default);
        this.app.use(this.apiPaths.sparePath, spare_1.default);
        this.app.use(this.apiPaths.unitPath, unit_1.default);
        this.app.use(this.apiPaths.spareGroupPath, spareGroup_1.default);
        this.app.use(this.apiPaths.vehiclePath, vehicle_1.default);
        this.app.use(this.apiPaths.orderGroupPath, orderGroup_1.default);
        this.app.use(this.apiPaths.userPath, users_1.default);
        this.app.use(this.apiPaths.rolePath, role_1.default);
        this.app.use(this.apiPaths.authPath, auth_1.default);
        this.app.use(this.apiPaths.brandPath, brand_1.default);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerSpec));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en el puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map