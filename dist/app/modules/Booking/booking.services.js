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
exports.bookingServices = void 0;
const mongoose_1 = require("mongoose");
const booking_model_1 = __importDefault(require("./booking.model"));
const user_model_1 = require("../Registration/user.model");
const facility_model_1 = __importDefault(require("../Facility/facility.model"));
const createBookingIntoDB = (bookingData, userid) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await UserRegModel.findOne({ _id: userid });
    // console.log("this is user", user._id.toString());
    const session = yield mongoose_1.mongoose.startSession();
    // const Id = user._id.toString();
    const { facility, date, startTime, endTime } = bookingData;
    const facilitdata = yield facility_model_1.default.findOne({ _id: facility });
    const facilityprice = facilitdata.pricePerHour;
    // Parse the date or use today's date if not provided
    const queryDate = date ? new Date(date) : new Date();
    // Check facility availability
    const existingBookings = yield booking_model_1.default.find({
        facility: facility,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
    console.log("this", existingBookings);
    //console.log(existingBookings);
    if (existingBookings.length > 0) {
        return "Facility is not available during the requested time slot.";
    }
    // const facilityDetails = await FacilityModel.findById(facility);
    // if (!facilityDetails) {
    //   return next(new AppError("Facility not found!", 404));
    // }
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;
    // Calculate duration in hours
    const durationInHours = (endInMinutes - startInMinutes) / 60;
    // Calculate price
    const price = durationInHours * facilityprice;
    // const hours = (new Date(`1970-01-01T${endTime}Z`).getHours() - new Date(`1970-01-01T${startTime}Z`).getHours());
    // const payableAmount = hours * facilityDetails.pricePerHour;
    const newBooking = new booking_model_1.default({
        facility: facility,
        date: queryDate,
        startTime: startTime,
        endTime: endTime,
        user: userid,
        payableAmount: price,
        isBooked: "confirmed",
    });
    try {
        session.startTransaction();
        const newUser = yield booking_model_1.default.create([newBooking], { session });
        yield session.commitTransaction();
        session.endSession();
        return newUser;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const io = yield user_model_1.UserRegModel.findOne({ _id: "6675cac287245387ae84f79e" });
    console.log("this is ", io);
    const result = yield booking_model_1.default.find({ isBooked: "confirmed" })
        .populate("user")
        .populate("facility");
    return result;
});
const findBookingsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("this is id", userId);
    const bookings = yield booking_model_1.default.find({ user: userId, isBooked: "confirmed" })
        .populate({
        path: 'facility',
        match: { isDeleted: false }
    });
    console.log("this is booking", bookings);
    return bookings;
});
const BookingCancle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //const result1 = await FacilityModel.findOne(_id: id)
    console.log("this is data", id);
    const result = yield booking_model_1.default.findByIdAndUpdate(id, { isBooked: "cancelled" }, {
        new: true,
    })
        .populate({
        path: 'facility',
        match: { isDeleted: false }
    });
    ;
    return result;
});
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    findBookingsByUserId,
    BookingCancle,
};
