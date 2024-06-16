import { Request, Response } from "express";
import prisma from "../prisma/client";
// 자산 타입 전체 조회
export const getAllAssetTypes = async (req: Request, res: Response) => {
  const { workspace_id } = req.params;
  try {
    const assetTypes = await prisma.assetType.findMany({
      where: {
        workspace_id,
      },
    });
    res.json(assetTypes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch asset types" });
  }
};

// 자산 타입 생성
export const createAssetType = async (req: Request, res: Response) => {
  const { workspace_id } = req.params;
  const { asset_type_name } = req.body;
  try {
    const assetType = await prisma.assetType.create({
      data: {
        workspace_id,
        asset_type_name,
      },
    });
    res.status(201).json(assetType);
  } catch (error) {
    res.status(500).json({ error: "Failed to create asset type" });
  }
};

// 자산 타입 수정
export const updateAssetType = async (req: Request, res: Response) => {
  const { workspace_id, id } = req.params;
  const { asset_type_name } = req.body;
  try {
    const assetType = await prisma.assetType.update({
      where: { workspace_id, asset_type_id: parseInt(id) },
      data: {
        asset_type_name,
      },
    });
    res.json(assetType);
  } catch (error) {
    res.status(500).json({ error: "Failed to update asset type" });
  }
};

// 자산 타입 삭제
export const deleteAssetType = async (req: Request, res: Response) => {
  const { id, workspace_id } = req.params;
  try {
    await prisma.assetType.delete({
      where: { workspace_id, asset_type_id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete asset type" });
  }
};
