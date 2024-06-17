import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createInvitation,
  updateInvitation,
  deleteInvitation,
  getAllInvitations,
} from "../controllers/invitationController";

const router = express.Router();

// 초대 생성
router.post("/", authenticateToken, createInvitation);

// 초대 상태 업데이트
router.put("/:id", authenticateToken, updateInvitation);

// 초대 삭제
router.delete("/:id", authenticateToken, deleteInvitation);

// 워크스페이스에서 발송한 전체 초대 조회
router.get("/", authenticateToken, getAllInvitations);
export default router;
