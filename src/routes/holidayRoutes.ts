import { Router } from "express";
import {
  fetchHolidays,
  fetchIsHoliday,
} from "../controllers/holidayController";

const router = Router();

router.get("/holidays/:year", fetchHolidays);
router.get("/holiday/:date/check", fetchIsHoliday);

export default router;
