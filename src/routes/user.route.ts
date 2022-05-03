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

router.patch("/resetpassword", resetPassword);

router.patch("/resetmail", resetMail);

export default router;
