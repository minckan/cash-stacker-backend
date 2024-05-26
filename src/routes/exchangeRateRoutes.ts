import { Router } from "express";
import { fetchExchangeRate } from "../controllers/exchangeRateController";

const router = Router();

router.get("/exchange-rates", fetchExchangeRate);

export default router;
