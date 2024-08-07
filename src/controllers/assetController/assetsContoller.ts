import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { Prisma } from "@prisma/client";
import { getAssetDetail } from "../../services/assetService/getAssetDetail";

/// 자산 생성
export const createAsset = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const { asset_type_id, asset_name, transactions, currency_code } = req.body;

  try {
    // 트랜잭션 시작
    const result = await prisma.$transaction(
      async (prisma: Prisma.TransactionClient) => {
        // 새로운 Asset 생성
        const asset = await prisma.asset.create({
          data: {
            workspace_id: workspaceId,
            asset_type_id,
            asset_name,
            currency_code,
          },
        });

        // 자산과 연결된 거래내역 생성
        if (transactions) {
          const tr = await prisma.assetTransaction.create({
            data: {
              ...transactions,
              asset_id: asset.asset_id,
            },
          });

          // 중간 테이블에 데이터 추가
          await prisma.assetToTransaction.create({
            data: {
              asset_id: asset.asset_id,
              transaction_id: tr.transaction_id,
            },
          });
        }

        return asset;
      }
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "[ERROR] createAsset", error });
  }
};

/// 단일 자산 조회
export const getAssetById = async (req: Request, res: Response) => {
  const { id, workspaceId } = req.params;

  console.log("getAssetById", id);
  try {
    const assetAllTransactions = await getAssetDetail(workspaceId, id);

    res.status(201).send(assetAllTransactions);
  } catch (error) {
    res.status(500).send({ message: "[ERROR] getAssetById", error });
  }
};

/// 자산 수정
export const updateAsset = async (req: Request, res: Response) => {
  const { id, workspaceId } = req.params;
  const { asset_name } = req.body;

  try {
    const updatedAsset = await prisma.asset.update({
      where: { workspace_id: workspaceId, asset_id: Number(id) },
      data: { asset_name },
    });
    res.status(201).send(updatedAsset);
  } catch (error) {
    res.status(500).send({ message: "[ERROR] updateAsset", error });
  }
};

/// 자산 삭제
export const deleteAsset = async (req: Request, res: Response) => {
  const { id, workspaceId } = req.params;

  try {
    await prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
      await prisma.assetToTransaction.deleteMany({
        where: { asset_id: Number(id) },
      });
      await prisma.assetTransaction.deleteMany({
        where: { asset_id: Number(id) },
      });
      await prisma.asset.delete({
        where: { workspace_id: workspaceId, asset_id: Number(id) },
      });
    });
    res.status(201).send({ result: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "[ERROR] deleteAsset", error });
  }
};
