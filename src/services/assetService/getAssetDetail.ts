import prisma from "../../prisma/client";

interface TransactionResponseType {
  transactionId: number;
  transactionType: "SELL" | "BUY";
  description?: string;
  transactionDate: Date;
  exchangeRate?: number;
  shares?: number;
  pricePerShare?: number;
  currentPricePerShare?: number;
  currencyCode: string;
  balance?: number;
  isForeignTr: boolean;
  assetTypeId: number;
  assetName: string;
  assetId: number;
}

interface AssetTransactionsResponseType {
  assetId: number;
  isKrwCashAsset: boolean;
  currencyCode: string;
  total: number;
  assetTypeId: number;
  transaction: TransactionResponseType[];
}

export const getAssetDetail = async (
  workspaceId: string,
  assetID: string
): Promise<AssetTransactionsResponseType> => {
  const asset = await prisma.asset.findFirst({
    where: {
      asset_id: Number(assetID),
      workspace_id: workspaceId,
    },
    include: {
      transactions: true,
      asset_type: true,
    },
  });

  if (!asset) {
    throw new Error("Asset not found");
  }

  const transactionsPromise: Promise<TransactionResponseType>[] =
    asset.transactions.map(async (tr) => {
      const _ = await prisma.assetTransaction.findFirst({
        where: {
          transaction_id: tr.transaction_id,
        },
      });

      return {
        transactionId: _.transaction_id,
        transactionDate: _.transaction_date,
        transactionType: _.transaction_type,
        balance: _.balance,
        currentPricePerShare: _.current_price_per_share,
        description: _.description,
        exchangeRate: _.exchange_rate,
        pricePerShare: _.price_per_share,
        shares: _.shares,
        isForeignTr: asset.asset_type.is_foreign_asset_type,
        assetTypeId: asset.asset_type_id,
        assetName: asset.asset_name,
        assetId: asset.asset_id,
        currencyCode: asset.currency_code,
      } as TransactionResponseType;
    });

  const trs = await Promise.all(transactionsPromise);

  const total = await getTotal(trs);

  return {
    assetId: asset.asset_id,
    assetTypeId: asset.asset_type_id,
    currencyCode: asset.currency_code,
    transaction: trs,
    total,
    isKrwCashAsset: asset.asset_type_id === 5,
  };
};

const getTotal = async (trs: TransactionResponseType[]) => {
  // balance 계산
  let total = 0;
  for (const tr of trs) {
    if (tr.transactionType === "BUY") {
      if (tr.assetTypeId === 4) {
        total += (tr.balance ?? 0) * (tr.exchangeRate ?? 1);
      } else if (tr.assetTypeId === 5) {
        total += tr.balance ?? 0;
      } else {
        // AssetType이 외래 자산인지 확인
        const isForeignAssetType = tr.isForeignTr ?? false;
        if (isForeignAssetType) {
          total +=
            (tr.pricePerShare ?? 0) * (tr.shares ?? 0) * (tr.exchangeRate ?? 1);
        } else {
          total += (tr.pricePerShare ?? 0) * (tr.shares ?? 0);
        }
      }
    }
  }

  return total;
};
