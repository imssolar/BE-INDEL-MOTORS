"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRut = void 0;
const validateRut = (rutToValidate) => {
    // eslint-disable-next-line no-useless-escape
    const regexPattern = /\b\d{1,2}\.\d{3}\.\d{3}\-[K|k|0-9]/g;
    return regexPattern.test(rutToValidate);
};
exports.validateRut = validateRut;
//# sourceMappingURL=validateRut.js.map