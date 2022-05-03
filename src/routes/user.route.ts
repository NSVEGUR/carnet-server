import express from "express";
import {
  signup,
  login,
  mybookings,
  resetMail,
  resetPassword,
} from "./../controller/user.controller";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/mybookings", mybookings);

router.post("/resetpassword", resetPassword);

router.post("/resetmail", resetMail);

export default router;
