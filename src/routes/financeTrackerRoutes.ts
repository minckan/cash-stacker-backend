import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getMonthlyTransactions,
  getDailyTransactions,
} from "../controllers/transactionController";

const router = Router();

// 가계부 거래내역 생성
router.post("/:workspaceId", authenticateToken, createTransaction);

// 가계부 거래내역 수정
router.put("/:workspaceId/:id", authenticateToken, updateTransaction);

// 가계부 거래내역 삭제
router.delete("/:workspaceId/:id", authenticateToken, deleteTransaction);

// 월간 가계부 전체 조회
router.get(
  "/:workspaceId/monthly/:monthKey",
  authenticateToken,
  getMonthlyTransactions
);

// 일간 가계부 조회
router.get(
  "/:workspaceId/daily/:dateKey",
  authenticateToken,
  getDailyTransactions
);
export default router;
