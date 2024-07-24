import express from "express";

import { getMonthlyAssetTotals } from "../controllers/assetController/monthlyAssetTotalsController";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createAsset,
  deleteAsset,
  getAssetById,
  getAssets,
  updateAsset,
} from "../controllers/assetController/assetsContoller";
import {
  createAssetTransaction,
  deleteAssetTransaction,
  updateAssetTransaction,
} from "../controllers/assetController/assetTransactionContollers";

const router = express.Router({ mergeParams: true });

// 자산 생성
router.post("/", authenticateToken, createAsset);
// 자산 전체 조회
router.get("/", authenticateToken, getAssets);
// 자산 중 특정 자산 조회
router.get("/:id", authenticateToken, getAssetById);
// 자산업데이트
router.put("/:id", authenticateToken, updateAsset);
// 자산삭제
router.delete("/:id", authenticateToken, deleteAsset);
// ----------------------------------------------------------------
// 특정 자산의 거래내역 추가
router.post(
  "/:assetId/transactions",
  authenticateToken,
  createAssetTransaction
);
// 특정자산의 거래내역 수정
router.put(
  "/:assetId/transactions/:id",
  authenticateToken,
  updateAssetTransaction
);
// 특정자산의 거래내역 삭제
router.delete(
  "/:assetId/transactions/:id",
  authenticateToken,
  deleteAssetTransaction
);
// ----------------------------------------------------------------
// 월간 자산 추이 조회
router.get("/monthlyTrend", authenticateToken, getMonthlyAssetTotals);

export default router;
