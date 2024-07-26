import prisma from "../prisma/client";

interface AssetInfo {
  id: number; // 자산 아이디
  name: string; // 자산 이름
  amount: number; // 수량
  ratio: number; // 비율(비중)
  initialPurchaseDate: Date; // 최초 편입일
  buyingExchangeRate?: number; // 매입 환율 (optional)

  // [원화] 관련 필드
  totalBuyingAmountKrw?: number; // [원화] 투자 총액 (optional)
  buyingSinglePriceKrw: number; // [원화] 평균 매입가
  currentSinglePriceKrw: number; // [원화] 가장 최근 입력받은 현재가
  totalEvaluationAmountKrw: number; // [원화] 현재가 총금액
  profitLossRateKrw: number; // [원화] 원화환산 수익률
  totalCurrentAmountKrw?: number; // [원화] 현재가 총 평가액 (optional)

  // [외화] 관련 필드
  totalBuyingAmountForeign?: number; // [외화] 투자원금 총액 (optional)
  buyingSinglePriceForeign: number; // [외화] 평균 매입가
  currentSinglePriceForeign: number; // [외화] 가장 최근 입력 받은 현재가
  totalEvaluationAmountForeign: number; // [외화] 현재가 총금액
  profitLossRateForeign: number; // [외화] 외화 수익률 (외화 차제로 얼마나 수익이 있는지)
  totalCurrentAmountForeign?: number; // [외화] 현재가 총 평가액 (optional)
}

export interface Portfolio {
  totalAmount: number;
  ratios?: Record<string, { total_assets: number; asset_type_name: string }>;
  rows?: AssetInfo[];
}

export const fetchPortfolio = async (
  workspaceId: string
): Promise<Portfolio> => {
  // 자산 총 금액
  const totalAssetAmount = await getTotalAssetAmount(workspaceId);
  // 자산 타입 별 비율정보
  const ratioValue = await getTotalValueByAssetType(
    workspaceId,
    totalAssetAmount
  );
  // 자산별 종합 정보
  const assetDetails = await getAssetDetails(workspaceId);

  return {
    totalAmount: totalAssetAmount,
    ratios: ratioValue,
    rows: assetDetails,
  };
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

const getTotalValueByAssetType = async (
  workspaceId: string,
  totalAssetAmt: number
) => {
  const assetTypeTotals = await prisma.$queryRaw<
    { asset_type_name: string; asset_type_id: number; total_assets: number }[]
  >`
    SELECT 
      atype.asset_type_name,
      atype.asset_type_id,
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
    GROUP BY atype.asset_type_name, atype.asset_type_id
  `;

  const ratios: Record<
    string,
    { total_assets: number; asset_type_name: string }
  > = {};
  for (const assetType of assetTypeTotals) {
    const { asset_type_name, asset_type_id, total_assets } = assetType;
    ratios[asset_type_id] = {
      total_assets: (total_assets / totalAssetAmt) * 100,
      asset_type_name,
    };
  }

  return ratios;
};

const getAssetDetails = async (workspaceId: string) => {
  const assetDetails = await prisma.$queryRaw<AssetInfo[]>`
  SELECT 
    CASE 
      WHEN atype.asset_type_id IN (4, 5) THEN atype.asset_type_name 
      ELSE a.asset_name 
    END AS name,
    a.asset_id AS id,
    SUM(at.shares) AS amount,
    (SUM(at.shares * at.current_price_per_share) / total.total_assets) * 100 AS ratio,
    MIN(at.transaction_date) AS initialPurchaseDate,
    MAX(at.exchange_rate) AS buyingExchangeRate,

    -- [원화] 관련 필드
    SUM(at.balance) AS totalBuyingAmountKrw,
    AVG(at.price_per_share) AS buyingSinglePriceKrw,
    AVG(at.current_price_per_share) AS currentSinglePriceKrw,
    SUM(at.shares * at.current_price_per_share) AS totalEvaluationAmountKrw,
    (SUM(at.shares * at.current_price_per_share) - SUM(at.shares * at.price_per_share)) / SUM(at.shares * at.price_per_share) * 100 AS profitLossRateKrw,
    SUM(at.shares * at.current_price_per_share) AS totalCurrentAmountKrw,

    -- [외화] 관련 필드
    SUM(at.balance * COALESCE(at.exchange_rate, 1)) AS totalBuyingAmountForeign,
    AVG(at.price_per_share * COALESCE(at.exchange_rate, 1)) AS buyingSinglePriceForeign,
    AVG(at.current_price_per_share * COALESCE(at.exchange_rate, 1)) AS currentSinglePriceForeign,
    SUM(at.shares * at.current_price_per_share * COALESCE(at.exchange_rate, 1)) AS totalEvaluationAmountForeign,
    (SUM(at.shares * at.current_price_per_share * COALESCE(at.exchange_rate, 1)) - SUM(at.shares * at.price_per_share * COALESCE(at.exchange_rate, 1))) / SUM(at.shares * at.price_per_share * COALESCE(at.exchange_rate, 1)) * 100 AS profitLossRateForeign,
    SUM(at.shares * at.current_price_per_share * COALESCE(at.exchange_rate, 1)) AS totalCurrentAmountForeign
  FROM Asset a
  JOIN AssetToTransaction att ON a.asset_id = att.asset_id
  JOIN AssetTransaction at ON att.transaction_id = at.transaction_id
  JOIN AssetType atype ON a.asset_type_id = atype.asset_type_id
  JOIN (
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
  ) as total
  WHERE a.workspace_id = ${workspaceId}
  GROUP BY a.asset_name, a.asset_id, total.total_assets, atype.asset_type_name, atype.asset_type_id
`;

  return assetDetails;
};
