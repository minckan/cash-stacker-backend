import { Router } from "express";

import { fetchBigQueryAssetTransactions } from "../controllers/assetController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/monthlyTrend", authenticateToken, fetchBigQueryAssetTransactions);

export default router;
