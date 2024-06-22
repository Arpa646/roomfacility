import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "./asynch";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/Registration/user.constant";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Checking if the Authorization header is present
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You are not authorized!",
      });
    }

    const token = authHeader.split(" ")[1];

    // Checking if the token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You are not authorized!",
      });
    }

    // Verifying the token
    jwt.verify(token, "jjjnn", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You are not authorized!",
        });
      }

      const role = (decoded as jwt.JwtPayload).role;

      // Checking if the user has the required role
      if (requiredRoles && !requiredRoles.includes(role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "You have no access to this route",
        });
      }

      req.user = decoded as jwt.JwtPayload;
      next();
    });
  });
};

export default auth;
