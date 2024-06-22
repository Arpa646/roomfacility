import { Schema, model } from "mongoose"; // Added import for `model`
import { TUser } from "./user.interface";
import IUser from "./user.interface";
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    address: { type: String, required: true },
   
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const UserRegModel = this; // doc
  // hashing password and save into DB

  UserRegModel.password = await bcrypt.hash(
    UserRegModel.password,
    Number(10),
  );

  next();
});





export const UserRegModel = model<IUser>("User", userSchema);
