import { Router } from "express";

import { fetchMonthlyTotals } from "../controllers/assetController/fetchMonthlyAssetTotals";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/monthlyTrend", authenticateToken, fetchMonthlyTotals);

export default router;
