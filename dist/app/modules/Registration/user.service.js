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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.mongoose.startSession();
    try {
        session.startTransaction();
        const newUser = yield user_model_1.UserRegModel.create([userData], { session });
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
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserRegModel.find();
    return result;
});
exports.UserServices = { createUserIntoDB, getAllUserFromDB };
// const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const newFaculty = await Faculty.create([payload], { session });
//     await session.commitTransaction();
//     await session.endSession();
//     return newFaculty;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };
