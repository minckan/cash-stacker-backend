import { Request, Response } from "express";
import { getStockPrice } from "../services/stockPriceService";

export const fetchStockPrice = async (req: Request, res: Response) => {
  const { symbol } = req.params;

  if (!symbol) {
    return res.status(400).send("Stock symbol is required");
  }

  try {
    const data = await getStockPrice(symbol);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
