"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//this is gobal handler error crack system all error are catch here
const globalErrorHandler = (err, req, res, next) => {
    const statusCode = 500;
    const message = err.message || 'something wrong';
    return res.status(statusCode).json({
        success: 'false',
        message,
        error: err,
    });
};
exports.default = globalErrorHandler;
//   /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, Response } from 'express';
// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const statusCode = 500;
//   const message = err.message || 'Something went wrong!';
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// };
exports.default = globalErrorHandler;
