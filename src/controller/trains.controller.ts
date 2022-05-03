import { database } from "./../app";
import catchAsync from "../util/catchAsync.util";
import { Request, Response, NextFunction } from "express";
import AppError from "../util/appError.util";

const getTrains = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  database.pool.query(`SELECT * FROM route`, function (error, results, fields) {
    if (error) {
      console.log(error);
      return next(new AppError("Error in Signing Up", 400));
    }
    return res.status(200).json({
      status: "success",
      results,
    });
  });
});

export { getTrains };
