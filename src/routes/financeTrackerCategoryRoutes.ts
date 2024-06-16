import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/financeTrackerCategoryTypeController";

const router = Router();

// 가계부 카테고리 타입별 전체조회
router.get("/:workspaceId/:type", authenticateToken, getCategoriesByType);

// 가계부 카테고리 생성
router.post("/:workspaceId", authenticateToken, createCategory);

// 가계부 카테고리 수정
router.put("/:workspaceId/:id", authenticateToken, updateCategory);

// 가계부 카테고리 삭제
router.delete("/:workspaceId/:id", authenticateToken, deleteCategory);

export default router;