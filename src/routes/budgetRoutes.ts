import express from "express";
import { createUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createBudget,
  deleteBudget,
  getAllBudgets,
  updateBudget,
} from "../controllers/budgetController";

const router = express.Router();

// 활성중인 예산 조회
router.get("/:workspaceId", authenticateToken, getAllBudgets);

// 예산 생성
router.post("/:workspaceId", authenticateToken, createBudget);

// 예산 수정
router.put("/:workspaceId/:id", authenticateToken, updateBudget);

// 예산 삭제
router.delete("/:workspaceId/:id", authenticateToken, deleteBudget);

export default router;
