import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  createAssetType,
  deleteAssetType,
  getAllAssetTypes,
  updateAssetType,
} from "../controllers/assetTypeController";

const router = Router();

// 자산 타입 전체조회
router.get("/", authenticateToken, getAllAssetTypes);
// 자산 타입 생성
router.post("/", authenticateToken, createAssetType);
// 자산 타입 수정
router.put("/:id", authenticateToken, updateAssetType);
// 자산 타입 삭제
router.delete("/:id", authenticateToken, deleteAssetType);

export default router;
