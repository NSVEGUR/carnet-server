import express from "express";
import { bookTicket, searchTrains } from "./../controller/bookings.controller";

const router = express.Router();

router.post("/search", searchTrains);
router.post("/bookticket", bookTicket);

export default router;
