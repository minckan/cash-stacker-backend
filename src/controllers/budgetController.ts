import { Request, Response } from "express";
import prisma from "../prisma/client";
import {
  getActiveBudgetInfo,
  getCurrentExpendableBudget,
} from "../services/budgetService/getActiveBudgetInfo";

// 활성중인 예산 조회
export const getAllBudgets = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId } = req.params;
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        workspace_id: workspaceId,
      },
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch budgets", error });
  }
};

export const getActiveBudget = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId } = req.params;

  try {
    const budget = await getActiveBudgetInfo();

    const expendableBudget = await getCurrentExpendableBudget(
      workspaceId,
      budget
    );
    res.json({ budget, expendableBudget });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch active budgets", error });
  }
};

// 예산 생성
export const createBudget = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId } = req.params;
  const { start_date, end_date, amount, isActive } = req.body;

  try {
    if (isActive) {
      // 기존 활성화된 예산 비활성화
      await prisma.budget.updateMany({
        where: {
          workspace_id: workspaceId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });
    }

    // 새로운 예산 생성
    const budget = await prisma.budget.create({
      data: {
        workspace_id: workspaceId,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        amount: parseFloat(amount),
        isActive: Boolean(isActive),
      },
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: "Failed to create budget", error });
  }
};

// 예산 수정
export const updateBudget = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId, id } = req.params;
  const { start_date, end_date, amount, isActive } = req.body;

  try {
    if (Boolean(isActive)) {
      // 기존 활성화된 예산 비활성화
      await prisma.budget.updateMany({
        where: {
          workspace_id: workspaceId,
          isActive: true,
        },
        data: {
          isActive: false,
        },
      });
    }

    const original = await prisma.budget.findFirst({
      where: {
        budget_id: parseInt(id),
      },
    });

    console.log(original);

    // 예산 수정
    const budget = await prisma.budget.update({
      where: { budget_id: parseInt(id) },
      data: {
        start_date: start_date ? new Date(start_date) : original.start_date,
        end_date: end_date ? new Date(end_date) : original.end_date,
        amount: amount ? parseFloat(amount) : original.amount,
        isActive: isActive ? Boolean(isActive) : original.isActive,
      },
    });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Failed to update budget", error });
  }
};

// 예산 삭제
export const deleteBudget = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.budget.delete({
      where: { budget_id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete budget", error });
  }
};
