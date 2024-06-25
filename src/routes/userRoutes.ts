import express from "express";
import {
  createUser,
  getUser,
  updateUserStatus,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router({ mergeParams: true });

// 유저 조회
router.get("/:id", getUser);
// 유저생성
router.post("/", createUser);
// 유저상태 수정
router.put("/:id", authenticateToken, updateUserStatus);

export default router;
