import { Request, Response } from "express";
import prisma from "../prisma/client";
// 자산 타입 전체 조회
export const getAllAssetTypes = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  try {
    const assetTypes = await prisma.assetType.findMany({
      where: {
        workspace_id: workspaceId,
      },
    });
    const defaultAssetTypes = await prisma.assetType.findMany({
      where: {
        workspace_id: "default",
      },
    });

    res.json([...assetTypes, ...defaultAssetTypes]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch asset types", error });
  }
};

// 자산 타입 생성
export const createAssetType = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const { asset_type_name, is_foreign_asset_type } = req.body;
  try {
    const assetType = await prisma.assetType.create({
      data: {
        workspace_id: workspaceId,
        asset_type_name,
        is_foreign_asset_type,
        is_default: workspaceId == "default",
      },
    });
    res.status(201).json(assetType);
  } catch (error) {
    res.status(500).json({ message: "Failed to create asset type", error });
  }
};

// 자산 타입 수정
export const updateAssetType = async (req: Request, res: Response) => {
  const { workspaceId, id } = req.params;
  const { asset_type_name, is_foreign_asset_type } = req.body;
  try {
    if (workspaceId === "default") {
      throw new Error(
        "Invalid workspace ID : Default 데이터는 수정할 수 없습니다."
      );
    }
    const assetType = await prisma.assetType.update({
      where: { workspace_id: workspaceId, asset_type_id: parseInt(id) },
      data: {
        asset_type_name,
        is_foreign_asset_type,
      },
    });
    res.json(assetType);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to update asset type", error });
  }
};

// 자산 타입 삭제
export const deleteAssetType = async (req: Request, res: Response) => {
  const { id, workspaceId } = req.params;
  try {
    await prisma.assetType.delete({
      where: { workspace_id: workspaceId, asset_type_id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete asset type", error });
  }
};
