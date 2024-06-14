import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// 가계부 거래내역 생성
router.post("/", authenticateToken);
// 가계부 거래내역 수정
router.put("/:id", authenticateToken);
// 가계부 거래내역 삭제
router.delete("/:id", authenticateToken);
// 월간 가계부 전체 조회
router.get("/:monthKey", authenticateToken);
// 일간 가계부 조회
router.get("/:dateKey", authenticateToken);

export default router;
