import { Request, Response } from "express";

import { getMonthlyAssetTotals } from "../services/assetService";

export const fetchBigQueryAssetTransactions = async (
  req: Request,
  res: Response
) => {
  const { workspaceId } = req.body;

  if (!workspaceId) {
    return res.status(400).send("workspaceId is required");
  }

  try {
    const data = await getMonthlyAssetTotals(workspaceId);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
