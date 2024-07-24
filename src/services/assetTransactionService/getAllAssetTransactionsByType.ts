import prisma from "../../prisma/client";

export const getAllAssetTransactionsAsType = async (assetID: string) => {
  const assetTransaction = await prisma.assetTransaction.findMany({
    where: {
      asset_id: Number(assetID),
    },
  });
};
