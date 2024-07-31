import prisma from "../prisma/client";

interface AssetInfo {
  id: number; // 자산 아이디
  name: string; // 자산 이름
  amount?: number; // 수량
  ratio: number; // 비율(비중)
  initialPurchaseDate: Date; // 최초 편입일
  buyingExchangeRate?: number; // 매입 환율 (optional)
  currencyCode: string;

  // [원화] 관련 필드
  totalBuyingAmountKrw?: number; // [원화] 매입 총 금액
  buyingSinglePriceKrw?: number; // [원화] 평균 매입가
  currentSinglePriceKrw?: number; // [원화] 가장 최근 입력받은 현재가
  totalCurrentAmountKrw?: number; // [원화] 현재가 총금액
  // totalEvaluationAmountKrw?: number; // [원화] 원화평가수익  (totalCurrentAmountKrw - totalBuyingAmountKrw)
  // profitLossRateKrw?: number; // [원화] 수익률 (투자금 대비 totalEvaluationAmountKrw의 퍼센테이지)

  // [외화] 관련 필드
  totalBuyingAmountForeign?: number; // [외화] 매입 총 금액
  buyingSinglePriceForeign?: number; // [외화] 평균 매입가
  currentSinglePriceForeign?: number; // [외화] 가장 최근 입력 받은 현재가
  totalCurrentAmountForeign?: number; // [외화] 현재가 총금액
  // totalEvaluationAmountForeign?: number; // [외화] 외화평가수익 (totalCurrentAmountForeign - totalBuyingAmountForeign)
  // profitLossRateForeign?: number; // [외화] 수익률 (투자금 대비 totalEvaluationAmountForeign 퍼센테이지)
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
    rows: assetDetails.map((detail) => ({
      ...detail,
      amount: Number(detail.amount),
    })),
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
    a.currency_code AS currencyCode,
    CAST(SUM(CASE 
      WHEN atype.asset_type_id IN (4, 5) THEN NULL
      ELSE at.shares
    END) AS DECIMAL(10, 2)) AS amount,
    ( SUM(
        CASE
          WHEN atype.asset_type_id = 5 THEN at.balance
          WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN at.balance * COALESCE(at.exchange_rate, 1)
          WHEN atype.is_foreign_asset_type = true THEN at.shares * at.price_per_share * COALESCE(at.exchange_rate, 1)
          ELSE at.shares * at.price_per_share
        END
      ) / total.total_assets) * 100 AS ratio,
    MIN(at.transaction_date) AS initialPurchaseDate,
    MAX(at.exchange_rate) AS buyingExchangeRate,

    -- [원화] 관련 필드
    SUM(
        CASE
          WHEN atype.asset_type_id = 5 THEN at.balance
          WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN at.balance * COALESCE(at.exchange_rate, 1)
          WHEN atype.is_foreign_asset_type = true THEN at.shares * at.price_per_share * COALESCE(at.exchange_rate, 1)
          ELSE at.shares * at.price_per_share
        END
      ) AS totalBuyingAmountKrw,
    AVG(
        CASE
          WHEN atype.asset_type_id = 5 THEN NULL
          WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN NULL
          WHEN atype.is_foreign_asset_type = true THEN at.price_per_share * COALESCE(at.exchange_rate, 1)
          ELSE at.price_per_share
        END
      ) AS buyingSinglePriceKrw,
    AVG(
        CASE
          WHEN atype.asset_type_id = 5 THEN NULL
          WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN NULL
          WHEN atype.is_foreign_asset_type = true THEN at.current_price_per_share * COALESCE(at.exchange_rate, 1)
          ELSE at.current_price_per_share
        END
      ) AS currentSinglePriceKrw,
    SUM(
        CASE
          WHEN atype.asset_type_id = 5 THEN NULL
          WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN NULL
          WHEN atype.is_foreign_asset_type = true THEN at.shares * at.current_price_per_share * COALESCE(at.exchange_rate, 1)
          ELSE at.shares * at.current_price_per_share
        END
      ) AS totalCurrentAmountKrw,

    -- [외화] 관련 필드
    SUM(
        CASE
          WHEN atype.asset_type_id = 4 AND atype.is_foreign_asset_type = true THEN at.balance
          WHEN atype.is_foreign_asset_type = true THEN at.shares * at.price_per_share
          ELSE NULL
        END
      ) AS totalBuyingAmountForeign,
    AVG(
        CASE
          WHEN atype.asset_type_id NOT IN (4, 5) AND atype.is_foreign_asset_type = true THEN at.price_per_share
          ELSE NULL
        END
      ) AS buyingSinglePriceForeign,
    SUM(
        CASE
          WHEN atype.asset_type_id NOT IN (4, 5) AND atype.is_foreign_asset_type = true THEN at.shares * at.current_price_per_share
          ELSE NULL
        END
      ) AS totalCurrentAmountForeign
    
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
  ) as total ON 1=1
  WHERE a.workspace_id = ${workspaceId}
  GROUP BY a.asset_name, a.asset_id, total.total_assets, atype.asset_type_name, atype.asset_type_id
  `;

  return assetDetails;
};
