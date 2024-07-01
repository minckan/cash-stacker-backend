import { Request, Response } from "express";
import prisma from "../prisma/client";
import getMonthlyTransactionInfo from "../services/transactionService/getMonthlyTransactionInfo";
import getDailyTransactionInfo from "../services/transactionService/getDailyTransactionInfo";

// 가계부 거래내역 생성
export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId } = req.params;
  const {
    category_id,
    amount,
    transaction_type,
    description,
    transaction_date,
    payment_method,
  } = req.body;
  try {
    console.log({
      workspace_id: workspaceId,
      category_id: parseInt(category_id),
      amount: parseFloat(amount),
      transaction_type,
      description: description ?? "",
      transaction_date: new Date(transaction_date),
      payment_method: payment_method,
    });
    const transaction = await prisma.transaction.create({
      data: {
        workspace_id: workspaceId,
        category_id: parseInt(category_id),
        amount: parseFloat(amount),
        transaction_type,
        description: description ?? "",
        transaction_date: new Date(transaction_date),
        payment_method: payment_method,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction", error });
  }
};

// 가계부 거래내역 수정
export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    category_id,
    amount,
    transaction_type,
    description,
    transaction_date,
  } = req.body;
  try {
    const original = await prisma.transaction.findFirst({
      where: {
        transaction_id: parseInt(id),
      },
    });
    const transaction = await prisma.transaction.update({
      where: { transaction_id: parseInt(id) },
      data: {
        category_id: category_id ? parseInt(category_id) : original.category_id,
        amount: amount ? parseFloat(amount) : original.amount,
        transaction_type: transaction_type ?? original.transaction_type,
        description: description ?? original.description,
        transaction_date: transaction_date
          ? new Date(transaction_date)
          : original.transaction_date,
      },
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction", error });
  }
};

// 가계부 거래내역 삭제
export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({
      where: { transaction_id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction", error });
  }
};

// 월간 가계부 전체 조회
export const getMonthlyTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId, monthKey } = req.params;
  try {
    const response = await getMonthlyTransactionInfo({ workspaceId, monthKey });
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch monthly transactions", error });
  }
};

// 일간 가계부 조회
export const getDailyTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId, dateKey } = req.params;
  try {
    const response = getDailyTransactionInfo({ workspaceId, dateKey });
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch daily transactions", error });
  }
};
