import { Transaction } from "@prisma/client";
import prisma from "../../prisma/client";

interface MonthlyTransactionInfo {
  netTotal: number;
  expense: number;
  income: number;
  transactions: Array<Transaction>;
}

const getMonthlyTransactionInfo = async ({
  workspaceId,
  monthKey,
}: {
  workspaceId: string;
  monthKey: string;
}): Promise<MonthlyTransactionInfo> => {
  const startDate = new Date(monthKey);
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    1
  );

  const [transactions, expense, income] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        workspace_id: workspaceId,
        transaction_date: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        category: true,
      },
    }),

    prisma.transaction.aggregate({
      where: {
        transaction_type: "expense",
        workspace_id: workspaceId,
        transaction_date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    }),
    prisma.transaction.aggregate({
      where: {
        transaction_type: "income",
        workspace_id: workspaceId,
        transaction_date: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  const totalExpense = expense._sum.amount || 0;
  const totalIncome = income._sum.amount || 0;
  const netTotal = totalIncome - totalExpense;

  return {
    netTotal,
    expense: totalExpense,
    income: totalIncome,
    transactions,
  };
};

export default getMonthlyTransactionInfo;
