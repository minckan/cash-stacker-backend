import express from "express";
import { getPortfolio } from "../controllers/portfolioController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router({ mergeParams: true });

router.get("/", authenticateToken, getPortfolio);

export default router;
