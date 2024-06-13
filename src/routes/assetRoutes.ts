import { Router } from "express";

import { fetchMonthlyTotals } from "../controllers/assetController/fetchMonthlyAssetTotals";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// 자산 생성
router.post("/");
// 자산 전체 조회
router.get("/");
// 자산 중 특정 자산 조회
router.get("/:id");
// 자산업데이트
router.put("/:id");
// 자산삭제
router.delete("/:id");
// ----------------------------------------------------------------
// 특정자산의 특정자산 거래내역 수정
router.put("/:assetId/transactions/:id");
// 특정자산의 특정자산 거래내역 삭제
router.delete("/:assetId/transactions/:id");
// ----------------------------------------------------------------
// 월간 자산 추이 조회
router.post("/monthlyTrend", authenticateToken, fetchMonthlyTotals);

export default router;
