

import express from 'express';
import { userControllers } from './user.cntroller';
import Request from 'express';
import Response from 'express';
import NextFunction from 'express';
import {AnyZodObject} from 'zod'


const validatereq=(schema:anyZodObject)=>{




    return async(req:Request,res:Response,next:NextFunction)=>{
       try{
      await schema.parseAsync({
            body:req.body
        })
           next()
       }
       catch(err)
       {
        next(err)
       }
        
      
    
    }
    }
    export default validatereq