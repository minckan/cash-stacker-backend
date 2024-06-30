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
    res
      .status(500)
      .json({ message: "Failed to fetch categories by type", error });
  }
};

// 가계부 카테고리 생성
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["financial category"]
  const { workspaceId } = req.params;
  console.log(req.params);
  const { category_name, category_type } = req.body;
  try {
    console.log({
      workspace_id: workspaceId,
      category_name,
      category_type,
    });
    const category = await prisma.transactionCategory.create({
      data: {
        workspace_id: workspaceId,
        category_name,
        category_type,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// 가계부 카테고리 수정
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["financial category"]
  const { workspaceId, id } = req.params;
  const { category_name } = req.body;
  try {
    const category = await prisma.transactionCategory.update({
      where: { category_id: parseInt(id) },
      data: {
        category_name,
      },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
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
    const isCategoryInUse = await prisma.transaction.findMany({
      where: { category_id: parseInt(id) },
    });

    if (isCategoryInUse.length > 0) {
      res.status(404).json({
        message: "사용중인 카테고리는 삭제할 수 없습니다.",
      });
    } else {
      await prisma.transactionCategory.delete({
        where: { category_id: parseInt(id) },
      });
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
