import AppError from "../util/appError.util";
import { Request, Response, NextFunction } from "express";
import config from "./../config";

const handleJWTError = () =>
  new AppError("Invalid Token! Please Login Again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your Token Expired! Please Login Again", 401);

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: "failure",
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err: any, res: Response) => {
  // Errors created by me
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: "failure",
      message: err.message,
    });
  }
  //Programming or unknown error
  else {
    console.error("ERROR!💥💥💥", err);
    res.status(500).json({
      status: "failure",
      message: "Something went wrong :(",
    });
  }
};

export default function errorControler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (config.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (config.NODE_ENV === "production") {
    let error = err;
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
}
