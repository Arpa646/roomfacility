import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import { AuthServices } from "./auth.services";
import httpStatus from "http-status";
const loginUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const [accessToken,user] = await AuthServices.loginUser(req.body);



  // res.cookie('refreshToken', refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  // });

  // sendResponse(res, {
  //   statusCode: 200,
  //   success: true,
  //   message: "User is logged in succesfully!",
  //   Token:accessToken,
  //   data: {
     
  //     data:user
  //   },
  // });
  return res.status(200).send({
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: user
  });
});
export const AuthControllers = {
  loginUser,
};
