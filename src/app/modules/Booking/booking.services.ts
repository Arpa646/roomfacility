import { startSession, mongoose, Mongoose, ObjectId } from "mongoose";
import { Booking } from "./booking.inteface";
import BookingModel from "./booking.model";
import { UserRegModel } from "../Registration/user.model";
import FacilityModel from '../Facility/facility.model';

const createBookingIntoDB = async (bookingData: Booking, userid) => {
  // const user = await UserRegModel.findOne({ _id: userid });
  // console.log("this is user", user._id.toString());

  const session = await mongoose.startSession();

  // const Id = user._id.toString();

  const { facility, date, startTime, endTime } = bookingData;
  const facilitdata = await FacilityModel.findOne({ _id: facility });
  const facilityprice =facilitdata.pricePerHour


  // Parse the date or use today's date if not provided
  const queryDate = date ? new Date(date as string) : new Date();

  // Check facility availability

  const existingBookings = await BookingModel.find({
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

  const newBooking = new BookingModel({
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
    const newUser = await BookingModel.create([newBooking], { session });
    await session.commitTransaction();
    session.endSession();
    return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBookingsFromDB = async () => {
  const io = await UserRegModel.findOne({ _id: "6675cac287245387ae84f79e" });
  console.log("this is ", io);

  const result = await BookingModel.find({ isBooked: "confirmed" })
    .populate("user")
    .populate("facility");


  return result;
};

const findBookingsByUserId = async (userId: string) => {
  console.log("this is id", userId);

  const bookings = await BookingModel.find({ user: userId ,isBooked: "confirmed"})
  .populate({
    path: 'facility',
    match: { isDeleted: false }
  });
  console.log("this is booking", bookings);
  return bookings;
};
const BookingCancle = async (id) => {
  //const result1 = await FacilityModel.findOne(_id: id)
  console.log("this is data", id);
  const result = await BookingModel.findByIdAndUpdate(
    id,
    { isBooked: "cancelled" },
    {
      new: true,
    }
  )
  .populate({
    path: 'facility',
    match: { isDeleted: false }
  });;
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  findBookingsByUserId,
  BookingCancle,
};
