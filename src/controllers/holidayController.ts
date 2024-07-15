import { Request, Response } from "express";
import { getExchangeRate } from "../services/exchangeRateService";
import {
  checkHoliday,
  getHolidayByYear,
  saveHoliday,
} from "../services/holidayService";

export const fetchHolidays = async (req: Request, res: Response) => {
  try {
    const { year } = req.params;
    const data = await getHolidayByYear(year);
    await saveHoliday(data);
    res.status(200).send("OK");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const fetchIsHoliday = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const data = await checkHoliday(date);

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
