import express from "express";
import { bookTicket, searchTrains } from "./../controller/bookings.controller";
import { getTrains } from "./../controller/trains.controller";

const router = express.Router();

router.post("/search", searchTrains);
router.post("/bookticket", bookTicket);
router.get("/", getTrains);

export default router;
