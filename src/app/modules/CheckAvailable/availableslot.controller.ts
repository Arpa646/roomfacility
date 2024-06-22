import catchAsync from '../../middleware/asynch';
import sendResponse from '../../utils/response';
import { slotServices } from './availableslot.services';



const checkslot = catchAsync  (async (req, res,next) => {

   
    const { date } = req.query;
    console.log(date)

    const result = await slotServices.checkslot(date);
console.log(result)
if (result.length === 0) {
  return res.status(404).json({
    success: false,
    message: 'No Data Found',
    data: [],
  });
}
    sendResponse(res,{
      statusCode:200,
      success:true,
      message:'facility created  succesfully',
      data:result
    })
    
  
})
export const checkSlotController= {checkslot}