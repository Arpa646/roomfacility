import { startSession,mongoose } from 'mongoose';
import { IUser } from './user.interface';
import { UserRegModel } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  const session = await mongoose.startSession();


  try {
    session.startTransaction();
    const newUser = await UserRegModel.create([userData], { session });
    await session.commitTransaction();
    session.endSession();
    return newUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



const getAllUserFromDB = async () => {
  const result = await UserRegModel.find()
 



  return result;
};

export const UserServices = { createUserIntoDB,getAllUserFromDB };
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