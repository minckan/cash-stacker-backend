import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { Prisma, PrismaClient } from "@prisma/client";

/// 특정 자산 거래내역 수정
export const updateAssetTransaction = async (req: Request, res: Response) => {
  // #swagger.tags = ["asset"]
  const { workspace_id, id, assetId } = req.params;
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
      where: { asset_id: Number(assetId), transaction_id: Number(id) },
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
    res.status(500).send({ error: "Failed to create user" });
  }
};

/// 특정자산의 거래내역 삭제
export const deleteAssetTransaction = async (req: Request, res: Response) => {
  // #swagger.tags = ["asset"]
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
    res.status(500).send({ error: "Failed to create user" });
  }
};
