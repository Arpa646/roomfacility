import { UserServices } from "./user.service";
import catchAsync from "../../middleware/asynch";
import sendResponse from "../../utils/response";
import userValidationSchema from "./user.validation";
import { userValidationSchema } from './user.validation';
const createUser = catchAsync(async (req, res, next) => {
  const { user: UserData } = req.body;

  //const validate= userValidationSchema.parse(UserData);
console.log(UserData);
  const validationResult = userValidationSchema.safeParse(UserData);
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







  const result = await UserServices.createUserIntoDB(UserData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Register succesfully",
    data: result,
  });
});

const getAllUser = async (req: Request, res: Response) => {
  try {
    console.log("test", req.user);
    const result = await UserServices.getAllUserFromDB();
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Students are retrieved succesfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userControllers = {
  createUser,
  getAllUser,
};
