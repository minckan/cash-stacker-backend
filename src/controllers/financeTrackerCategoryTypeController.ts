import { Request, Response } from "express";
import prisma from "../prisma/client";

// 가계부 카테고리 타입별 전체조회
export const getCategoriesByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["financial category"]
  const { workspaceId, type } = req.params;
  try {
    const categories = await prisma.transactionCategory.findMany({
      where: {
        workspace_id: workspaceId,
        category_type: type,
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// 가계부 카테고리 생성
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["financial category"]
  const { workspaceId } = req.params;
  const { category_name, category_type } = req.body;
  try {
    const category = await prisma.transactionCategory.create({
      data: {
        workspace_id: workspaceId,
        category_name,
        category_type,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

// 가계부 카테고리 수정
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["financial category"]
  const { workspaceId, id } = req.params;
  const { category_name, category_type } = req.body;
  try {
    const category = await prisma.transactionCategory.update({
      where: { category_id: parseInt(id) },
      data: {
        category_name,
        category_type,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// 가계부 카테고리 삭제
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["financial category"]
  const { workspaceId, id } = req.params;
  try {
    await prisma.transactionCategory.delete({
      where: { category_id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
