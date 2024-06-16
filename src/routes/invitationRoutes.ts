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
router.post("/:workspaceId", authenticateToken, createInvitation);

// 초대 상태 업데이트
router.put("/:workspaceId/:id", authenticateToken, updateInvitation);

// 초대 삭제
router.delete("/:workspaceId/:id", authenticateToken, deleteInvitation);

// 워크스페이스에서 발송한 전체 초대 조회
router.get("/:workspaceId", authenticateToken, getAllInvitations);
export default router;
