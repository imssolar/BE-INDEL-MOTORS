"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
const JWTValidate_1 = require("../middlewares/JWTValidate");
const express_validator_1 = require("express-validator");
const routes = (0, express_1.Router)();
/**
 * @swagger
* /api/login:
*     post:
*      summary: Iniciar sesión
*      description: Iniciar sesión con credenciales de usuario.
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                email:
*                  type: string
*                  description: Dirección de correo electrónico del usuario.
*                password:
*                  type: string
*                  description: Contraseña del usuario.
*      responses:
*        '200':
*          description: Inicio de sesión exitoso.
*        '401':
*          description: Credenciales incorrectas.
*      security:
*        - appkey: []
* components:
*    securitySchemes:
*      appkey:
*        type: apiKey
*        in: header
*        name: appkey
*
*/ routes.get('/', [JWTValidate_1.validateJWT], Auth_1.getUserByToken);
routes.post("/login", [
    (0, express_validator_1.check)("email")
        .isEmail()
        .withMessage("El email no tiene el formato correcto"),
    (0, express_validator_1.check)("password")
        .isLength({ min: 4 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
], Auth_1.Login);
exports.default = routes;
//# sourceMappingURL=auth.js.map