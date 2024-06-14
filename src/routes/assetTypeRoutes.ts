import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// 자산 타입 전체조회
router.get("/", authenticateToken);
// 자산 타입 생성
router.post("/", authenticateToken);
// 자산 타입 수정
router.put("/:id", authenticateToken);
// 자산 타입 삭제
router.delete("/:id", authenticateToken);

export default router;
