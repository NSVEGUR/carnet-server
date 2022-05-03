import { database } from "./../app";
import catchAsync from "../util/catchAsync.util";
import { Request, Response, NextFunction } from "express";
import AppError from "../util/appError.util";

interface User {
  mail: string;
  password: string;
}

interface Userid {
  userid: string | number;
}

interface ResetPasswordDetails {
  userid: string | number;
  password: string;
}

interface ResetMailDetails {
  userid: string | number;
  mail: string;
}

const signup = catchAsync(async function (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) {
  const { mail, password } = req.body;
  database.pool.query(
    `INSERT INTO user (mail, password) VALUES ("${mail}", "${password}")`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        return next(new AppError("Error in Signing Up", 400));
      }
      return res.status(200).json({
        status: "success",
        message: "Signed Up Successfully",
        results: {
          mail,
          password,
          userid: results.insertId,
        },
      });
    }
  );
});

const login = catchAsync(async function (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) {
  const { mail, password } = req.body;
  database.pool.query(
    `SELECT * FROM user WHERE mail="${mail}" and password="${password}"`,
    function (error, results, fields) {
      if (error) {
        return next(new AppError("Wrong Password or Mail", 400));
      }
      if (results.length === 0) {
        return res.status(404).json({
          status: "failure",
          message: "Wrong Password or Mail",
          results,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Logged In Successfully",
        results,
      });
    }
  );
});

const mybookings = catchAsync(async function (
  req: Request<{}, {}, Userid>,
  res: Response,
  next: NextFunction
) {
  const { userid } = req.body;
  database.pool.query(
    `SELECT * FROM bookings where bookings.userid="${userid}"`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        return next(new AppError("Error in Fetching Bookings", 400));
      }
      return res.status(200).json({
        status: "success",
        results,
      });
    }
  );
});

const resetPassword = catchAsync(async function (
  req: Request<{}, {}, ResetPasswordDetails>,
  res: Response,
  next: NextFunction
) {
  const { userid, password } = req.body;
  if (!password) return next(new AppError("Password Can't be Null", 400));
  database.pool.query(
    `UPDATE user SET password="${password}" where userid="${userid}"`,
    function (error, results, fields) {
      if (error) {
        return next(new AppError("Error in Changing Password", 400));
      }
      return res.status(200).json({
        status: "success",
        results: {
          password,
        },
      });
    }
  );
});

const resetMail = catchAsync(async function (
  req: Request<{}, {}, ResetMailDetails>,
  res: Response,
  next: NextFunction
) {
  const { userid, mail } = req.body;
  if (!mail) return next(new AppError("Mail Can't be Null", 400));
  database.pool.query(
    `UPDATE user SET mail="${mail}" where userid="${userid}"`,
    function (error, results, fields) {
      if (error) {
        return next(new AppError("Error in Fetching Bookings", 400));
      }
      return res.status(200).json({
        status: "success",
        results: {
          mail,
        },
      });
    }
  );
});

export { signup, login, mybookings, resetPassword, resetMail };
