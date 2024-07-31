import express from "express";
import { verifyToken } from "../controllers/invitationController";
const router = express.Router();

// 초대 토큰 검증
router.post("/verify", verifyToken);

export default router;
