import mongoose, { Schema, Document, Model } from "mongoose";
import { Booking } from "./booking.interface";

const bookingSchema: Schema = new Schema<Booking>({
  facility: {
    type: Schema.Types.ObjectId,
    ref: "Facility", // Ensure this matches the model name in FacilityModel
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Ensure this matches the model name for UserRegModel
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

const BookingModel: Model<Booking> = mongoose.model<Booking>(
  "Booking",
  bookingSchema
);

export default BookingModel;
