import express from "express";
import { createUser } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

// 유저생성
router.post("/", createUser);
// 유저상태 수정
router.put("/:id", authenticateToken);

export default router;
