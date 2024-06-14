import express from "express";
import {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
} from "../controllers/workspaceController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// 워크스페이스 생성
router.post("/", authenticateToken, createWorkspace);
// 워크스페이스 전체 조회
router.get("/", authenticateToken, getWorkspaces);
// 특정 워크스페이스 조회
router.get("/:id", authenticateToken, getWorkspaceById);

export default router;
