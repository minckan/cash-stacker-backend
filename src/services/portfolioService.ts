import prisma from "../prisma/client";

export interface Portfolio {
  totalAmount: number;
  ratios?: Record<string, number>;
  rows?: {
    domesticTotal: number;
    domesticAverageBuyingSinglePrice: number;
    domesticCurrentSinglePrice: number;
    domesticCurrentTotalPrice: number;
  }[];
}

export const fetchPortfolio = async (
  workspaceId: string
): Promise<Portfolio> => {
  // 자산 총 금액
  const totalAssetAmount = await getTotalAssetAmount(workspaceId);
  // 자산 타입 별 비율정보

  // 자산별 종합 정보

  return { totalAmount: totalAssetAmount };
};

const getTotalAssetAmount = async (workspaceId: string) => {
  const result = await prisma.$queryRaw`
  SELECT 
        SUM(
          CASE
            WHEN atype.asset_type_id = 5 THEN at.balance
            WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN at.balance * COALESCE(at.exchange_rate, 1)
            WHEN atype.is_foreign_asset_type = true THEN at.shares * at.price_per_share * COALESCE(at.exchange_rate, 1)
            ELSE at.shares * at.price_per_share
          END
        ) as total_assets
      FROM Asset a
      JOIN AssetType atype ON a.asset_type_id = atype.asset_type_id
      JOIN AssetToTransaction att ON a.asset_id = att.asset_id
      JOIN AssetTransaction at ON att.transaction_id = at.transaction_id
      WHERE a.workspace_id = ${workspaceId}
`;

  return result[0].total_assets;
};
