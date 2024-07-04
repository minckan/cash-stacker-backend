import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";

/// 특정 자산의 거래내역을 생성
export const createAssetTransaction = async (req: Request, res: Response) => {
  const { assetID } = req.params;

  const {
    amount,
    transaction_type,
    description,
    transaction_date,
    exchange_rate,
    shares,
    price_per_share,
    currency,
  } = req.body;

  try {
    const assetTransaction = await prisma.assetTransaction.create({
      data: {
        asset_id: Number(assetID),
        currency,
        amount,
        transaction_type,
        description,
        transaction_date,
        exchange_rate,
        shares,
        price_per_share,
      },
    });
    res.status(201).send(assetTransaction);
  } catch (error) {
    res.status(500).send({ message: "Failed to create user", error });
  }
};

/// 특정 자산 거래내역 수정
export const updateAssetTransaction = async (req: Request, res: Response) => {
  const { id, assetId } = req.params;
  const {
    amount,
    transaction_type,
    description,
    transaction_date,
    exchange_rate,
    shares,
    price_per_share,
  } = req.body;

  try {
    const updatedAssetTr = await prisma.assetTransaction.update({
      where: {
        asset_id: Number(assetId),
        transaction_id: Number(id),
      },
      data: {
        amount,
        transaction_type,
        description,
        transaction_date,
        exchange_rate,
        shares,
        price_per_share,
      },
    });
    res.status(201).send(updatedAssetTr);
  } catch (error) {
    res.status(500).send({ message: "Failed to create user", error });
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
    res.status(500).send({ message: "Failed to create user", error });
  }
};
