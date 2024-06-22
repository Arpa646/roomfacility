
import  {NextFunction, Request, Response } from 'express';

//this is gobal handler error crack system all error are catch here

const notFound=(err:any,req:Request,res:Response,next:NextFunction)=>{


    return res.status(400).json({
    success:'false',
    massage:'api not found',
    error:''
    })
  
  }
  export default notFound;