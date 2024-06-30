import { Budget } from "@prisma/client";
import prisma from "../../prisma/client";

interface ExpendableBudgetType {
  expendableBudget: number;
  percentage: number;
}

/// 활성상태인 예산 객체
export const getActiveBudgetInfo = async (): Promise<Budget | null> => {
  const budget = await prisma.budget.findFirst({
    where: {
      isActive: true,
    },
  });

  if (budget) {
    if (!isTodayInBudgetPeriod(budget)) {
      await prisma.budget.update({
        where: { budget_id: budget.budget_id },
        data: {
          isActive: false,
        },
      });
      return null;
    }
  }
  return budget;
};

/// 잔여 예산 수치 및 퍼센테이지
export const getCurrentExpendableBudget = async (
  workspaceId: string,
  budget: Budget
): Promise<ExpendableBudgetType | null> => {
  if (!budget) {
    return null;
  }
  const expenses = await prisma.transaction.aggregate({
    where: {
      workspace_id: workspaceId,
      transaction_date: {
        gte: budget.start_date,
        lt: budget.end_date,
      },
      transaction_type: "expense",
    },
    _sum: {
      amount: true,
    },
  });

  const totalExpense = expenses._sum.amount || 0;
  const expendableBudget = budget.amount - totalExpense;
  const percentage = (totalExpense / budget.amount) * 100;

  return {
    expendableBudget,
    percentage,
  };
};

const isTodayInBudgetPeriod = (budget: Budget) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(budget.start_date);
  const end = new Date(budget.end_date);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return today >= start && today <= end;
};
