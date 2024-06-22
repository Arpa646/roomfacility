"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(6, 'Name must be at least 6 characters long'),
    email: (0, zod_1.string)().email('Invalid email address'),
    password: (0, zod_1.string)().min(6, 'Password must be at least 6 characters long'),
    phone: (0, zod_1.string)().min(1, 'Phone is required'),
    role: (0, zod_1.string)().min(1, 'Role is required'),
    address: (0, zod_1.string)().min(1, 'Address is required'),
});
