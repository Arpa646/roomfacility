"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const intex_1 = __importDefault(require("./app/route/intex"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api', intex_1.default);
const getAController = (req, res) => {
    const a = 10;
    res.send(a);
};
app.get('/', getAController);
//app.use(globalErrorHandler)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Not Found',
    });
});
exports.default = app;
