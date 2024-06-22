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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: UserData } = req.body;
    //const validate= userValidationSchema.parse(UserData);
    console.log(UserData);
    const validationResult = user_validation_1.default.safeParse(UserData);
    console.log(validationResult);
    if (!validationResult.success) {
        // Collect validation errors
        const validationErrors = validationResult.error.errors.map((error) => ({
            path: error.path.join("."),
            message: error.message,
        }));
        // Return validation errors as JSON response
        return res.status(400).json({
            success: false,
            errors: validationErrors,
        });
    }
    const result = yield user_service_1.UserServices.createUserIntoDB(UserData);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Register succesfully",
        data: result,
    });
}));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("test", req.user);
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Students are retrieved succesfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.userControllers = {
    createUser,
    getAllUser,
};
