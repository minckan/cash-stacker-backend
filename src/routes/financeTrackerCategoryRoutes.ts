import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  getCategoriesByType,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/financeTrackerCategoryTypeController";

const router = Router({ mergeParams: true });

// 가계부 카테고리 생성
router.post("/", authenticateToken, createCategory);

// 가계부 카테고리 수정
router.put("/:id", authenticateToken, updateCategory);

// 가계부 카테고리 삭제
router.delete("/:id", authenticateToken, deleteCategory);

// 가계부 카테고리 타입별 전체조회
router.get("/:type", authenticateToken, getCategoriesByType);

export default router;
