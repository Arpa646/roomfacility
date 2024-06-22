import { UserRegModel } from "../Registration/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserRegModel.findOne({ email: payload.email });

  if (!user) {
    throw new "This user is not found !"();
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new "This user is deleted !"();
  }

  //checking if the password is correct

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.email,
    useremail: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, "jjjnn" as string, {
    expiresIn: "10d",
  });
  console.log(accessToken);

  return [accessToken, user];
};

export const AuthServices = {
  loginUser,
};
