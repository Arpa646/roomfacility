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
exports.bookingController = void 0;
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const booking_services_1 = require("./booking.services");
const booking_validation_1 = require("./booking.validation");
const createBooking = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { booking: bookingData } = req.body;
    const validationResult = booking_validation_1.bookingValidationSchema.safeParse(bookingData);
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
    const result = yield booking_services_1.bookingServices.createBookingIntoDB(bookingData, req.user.useremail);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "booking created  succesfully",
        data: result,
    });
}));
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_services_1.bookingServices.getAllBookingsFromDB();
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "bookings are retrieved succesfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getBookingsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { useremail } = req.user;
    try {
        const result = yield booking_services_1.bookingServices.findBookingsByUserId(useremail);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found",
                data: [],
            });
        }
        // const bookings = await findBookingsByUserId(user);
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message,
            data: {
                result,
            },
        });
    }
});
const cancelBooking = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("this is id", id);
    try {
        const result = yield booking_services_1.bookingServices.BookingCancle(id);
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
exports.bookingController = {
    createBooking,
    getAllBookings,
    getBookingsByEmail,
    cancelBooking,
};
