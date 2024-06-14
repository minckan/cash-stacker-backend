import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// 초대 생성
router.post("/", authenticateToken);

// 초대 상태 업데이트
router.put("/:id", authenticateToken);

// 초대 삭제
router.delete("/:id", authenticateToken);

// 워크스페이스에서 발송한 전체 초대 조회
router.get("/:workspaceId", authenticateToken);

export default router;
