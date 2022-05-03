import { database } from "./../app";
import catchAsync from "../util/catchAsync.util";
import { Request, Response, NextFunction } from "express";
import AppError from "../util/appError.util";

interface BookingDetails {
  from: string;
  to: string;
  date: Date | string;
  coach: string;
  trainid: string | number;
  userid: string | number;
  departure: string | number;
  arrival: string | number;
}

interface RouteDetails {
  from: string;
  to: string;
}

const bookTicket = catchAsync(async function (
  req: Request<{}, {}, BookingDetails>,
  res: Response,
  next: NextFunction
) {
  const { from, to, date, coach, trainid, userid, departure, arrival } =
    req.body;
  database.pool.query(
    `INSERT INTO bookings (trainid, userid, 
			from_place, to_place, date_of_journey, departure, arrival, 
			coach) VALUES ("${trainid}", "${userid}", "${from}", "${to}", 
			"${date}", "${departure}", "${arrival}", "${coach}" )`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        return next(new AppError("Error in Signing Up", 400));
      }
      return res.status(200).json({
        status: "success",
        results: req.body,
      });
    }
  );
});

const searchTrains = catchAsync(async function (
  req: Request<{}, {}, RouteDetails>,
  res: Response,
  next: NextFunction
) {
  const { from, to } = req.body;
  console.log(from, to);
  database.pool.query(
    `SELECT * FROM route where from_place="${from}" and to_place="${to}"`,
    function (error, results, fields) {
      if (error) {
        return next(new AppError("Error in Signing Up", 400));
      }
      return res.status(200).json({
        status: "success",
        results,
      });
    }
  );
});

export { bookTicket, searchTrains };
