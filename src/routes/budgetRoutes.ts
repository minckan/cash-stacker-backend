import express from "express";
import { createUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// 활성중인 예산 조회
router.get("/", authenticateToken);

// 예산 생성
router.post("/", authenticateToken);

// 예산 수정
router.put("/:id", authenticateToken);

// 예산 삭제
router.delete("/:id", authenticateToken);

export default router;
