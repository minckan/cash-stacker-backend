import { Request, Response } from "express";
import { getExchangeRate } from "../services/exchangeRateService";

export const fetchExchangeRate = async (req: Request, res: Response) => {
  try {
    const data = await getExchangeRate();
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
