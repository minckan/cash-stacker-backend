import { Transaction } from "@prisma/client";
import prisma from "../../prisma/client";

interface DailyTransactionInfo {
  total: number;
  expense: number;
  income: number;
  transactions: Array<Transaction>;
}

const getDailyTransactionInfo = async ({
  workspaceId,
  dateKey,
}: {
  workspaceId: string;
  dateKey: string;
}): Promise<DailyTransactionInfo> => {
  const date = new Date(dateKey);
  const [transactions, total, expense, income] = await Promise.all([
    prisma.transaction.findMany({
      where: {
        workspace_id: workspaceId,
        transaction_date: {
          gte: date,
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      },
      include: {
        category: true,
      },
    }),
    prisma.transaction.aggregate({
      where: {
        workspace_id: workspaceId,
        transaction_date: {
          gte: date,
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      },
      _sum: {
        amount: true,
      },
    }),
    prisma.transaction.aggregate({
      where: {
        transaction_type: "expense",
        workspace_id: workspaceId,
        transaction_date: {
          gte: date,
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
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
          gte: date,
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    total: total._sum.amount || 0,
    expense: expense._sum.amount || 0,
    income: income._sum.amount || 0,
    transactions,
  };
};

export default getDailyTransactionInfo;
