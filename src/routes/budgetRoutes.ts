import express from "express";
import { createUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createBudget,
  deleteBudget,
  getActiveBudget,
  getAllBudgets,
  updateBudget,
} from "../controllers/budgetController";

const router = express.Router({ mergeParams: true });

// 전체 예산 조회
router.get("/", authenticateToken, getAllBudgets);

// 활성중인 예산 조회
router.get("/active", authenticateToken, getActiveBudget);

// 예산 생성
router.post("/", authenticateToken, createBudget);

// 예산 수정
router.put("/:id", authenticateToken, updateBudget);

// 예산 삭제
router.delete("/:id", authenticateToken, deleteBudget);

export default router;
