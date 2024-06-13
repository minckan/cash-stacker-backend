import { Router } from "express";

const router = Router();

// 자산 타입 전체조회
router.get("/");
// 자산 타입 생성
router.post("/");
// 자산 타입 수정
router.put("/:id");
// 자산 타입 삭제
router.delete("/:id");
