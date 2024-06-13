import { Router } from "express";

const router = Router();

// 가계부 거래내역 생성
router.post("/");
// 가계부 거래내역 수정
router.put("/:id");
// 가계부 거래내역 삭제
router.delete("/:id");
// 월간 가계부 전체 조회
router.get("/:monthKey");
// 일간 가계부 조회
router.get("/:dateKey");
