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
  balance?: number;
  currencyCode: string;
  isForeignTr: boolean;
  assetTypeId: number;
  assetName: string;
  assetId: number;
}

interface AllAssetsResponseType {
  total: number;
  transaction: TransactionResponseType[];
}

export const getAllAssetsTransactions = async (
  workspaceId: string
): Promise<AllAssetsResponseType> => {
  const assets = await prisma.asset.findMany({
    where: {
      workspace_id: workspaceId,
    },
    include: {
      transactions: true,
      asset_type: true,
    },
  });

  const transactionsPromise: Promise<TransactionResponseType>[] =
    assets.flatMap((asset) =>
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
          currencyCode: asset.currency_code,
          isForeignTr: asset.asset_type.is_foreign_asset_type,
          assetTypeId: asset.asset_type_id,
          assetName: asset.asset_name,
          assetId: asset.asset_id,
        } as TransactionResponseType;
      })
    );

  const trs = await Promise.all(transactionsPromise);

  const total = getTotal(trs);

  return {
    transaction: trs,
    total,
  };
};

const getTotal = (trs: TransactionResponseType[]) => {
  return trs.reduce((total, tr) => {
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

    return total;
  }, 0);
};
