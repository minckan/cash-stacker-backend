import { Router } from "express";
import { fetchStockPrice } from "../controllers/stockPriceController";

const router = Router();

router.get("/stock-prices/:symbol", fetchStockPrice);

export default router;
