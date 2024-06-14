import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// 가계부 카테고리 타입별 전체조회
router.get("/:type", authenticateToken);
// 가계부 카테고리 생성
router.post("/", authenticateToken);
// 가계부 카테고리 수정
router.put("/:id", authenticateToken);
// 가계부 카테고리 삭제
router.delete("/:id", authenticateToken);

export default router;
