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
exports.facilityController = void 0;
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const facility_services_1 = require("./facility.services");
const facility_validation_1 = require("./facility.validation");
const createFacility = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { facility: facilityData } = req.body;
    console.log(facilityData);
    const validationResult = facility_validation_1.facilityValidationSchema.safeParse(facilityData);
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
    const result = yield facility_services_1.facilityServices.createFacilityIntoDB(facilityData);
    console.log(result);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "facility created  succesfully",
        data: result,
    });
}));
const getAllFacility = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("test", req.user);
        const result = yield facility_services_1.facilityServices.getAllFacilityFromDB();
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Facility are retrieved succesfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const deleteFacility = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("this is id", id);
    try {
        const result = yield facility_services_1.facilityServices.deleteFacilityInDB(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Facility not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Facility deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting facility",
            error: error.message,
        });
    }
}));
const updateFacility = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result = yield facility_services_1.facilityServices.updateFacilityInDB(id, updateData);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Facility not found",
        });
    }
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Facility updated successfully",
        data: result,
    });
}));
exports.facilityController = {
    createFacility,
    getAllFacility,
    updateFacility,
    deleteFacility,
};
