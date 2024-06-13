import { Router } from "express";

const router = Router();

// 가계부 카테고리 타입별 전체조회
router.get("/:type");
// 가계부 카테고리 생성
router.post("/");
// 가계부 카테고리 수정
router.put("/:id");
// 가계부 카테고리 삭제
router.delete("/:id");
