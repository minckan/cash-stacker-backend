import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { Prisma } from "@prisma/client";
import { getAllAssetTransactionsAsType } from "../../services/assetTransactionService/getAllAssetTransactionsByType";

/// 특정 자산의 거래내역을 조회
export const getAllAssetTransactions = async (req: Request, res: Response) => {
  const { assetID } = req.params;

  try {
    const assetAllTransactions = getAllAssetTransactionsAsType(assetID);

    res.status(201).send();
  } catch (error) {
    res.status(500).send({ message: "[ERROR] getAllAssetTransactions", error });
  }
};

/// 특정 자산의 거래내역을 생성
export const createAssetTransaction = async (req: Request, res: Response) => {
  const { assetID } = req.params;

  const {
    transaction_type,
    description,
    transaction_date,
    exchange_rate,
    shares,
    price_per_share,
    current_price_per_share,
  } = req.body;

  try {
    const assetTransaction = await prisma.assetTransaction.create({
      data: {
        asset_id: Number(assetID),
        transaction_type,
        description,
        transaction_date,
        exchange_rate,
        shares,
        price_per_share,
        current_price_per_share,
      },
    });
    res.status(201).send(assetTransaction);
  } catch (error) {
    res.status(500).send({ message: "[ERROR] createAssetTransaction", error });
  }
};

/// 특정 자산 거래내역 수정
export const updateAssetTransaction = async (req: Request, res: Response) => {
  const { id, assetId } = req.params;
  const {
    transaction_type,
    description,
    transaction_date,
    exchange_rate,
    shares,
    price_per_share,
    current_price_per_share,
  } = req.body;

  try {
    const updatedAssetTr = await prisma.assetTransaction.update({
      where: {
        asset_id: Number(assetId),
        transaction_id: Number(id),
      },
      data: {
        transaction_type,
        description,
        transaction_date,
        exchange_rate,
        shares,
        price_per_share,
        current_price_per_share,
      },
    });
    res.status(201).send(updatedAssetTr);
  } catch (error) {
    res.status(500).send({ message: "[ERROR] updateAssetTransaction", error });
  }
};

/// 특정자산의 거래내역 삭제
export const deleteAssetTransaction = async (req: Request, res: Response) => {
  const { assetId, id } = req.params;

  try {
    await prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
      await prisma.assetToTransaction.deleteMany({
        where: { transaction_id: Number(id) },
      });
      await prisma.assetTransaction.deleteMany({
        where: { transaction_id: Number(id) },
      });
    });
    res.status(201).send({ result: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "[ERROR] deleteAssetTransaction", error });
  }
};
