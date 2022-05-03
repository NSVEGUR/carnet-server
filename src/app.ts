import config from "./config";
import express, { Request, Response, NextFunction, Express } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import AppError from "./util/appError.util";
import errorHandler from "./controller/error.controller";
import { Database } from "./connect";
import userRouter from "./routes/user.route";
import bookingRouter from "./routes/booking.route";

const app: Express = express();
const database = new Database();

app.use(helmet());

if (config.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//For CORS (Cross origin resource sharing)
app.use(
  cors({
    origin: "*",
  })
);

//Data Sanitisation against XSS
app.use(xss());

//Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [], //Parameters for which we don't wanna restrict duplications
  })
);

app.use("/user", userRouter);
app.use("/trains", bookingRouter);

//UNUSED ROUTES MIDDLEWARE
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`can't find the ${req.originalUrl} on this server`, 404));
});

//GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

export default app;

export { database };
