import { Request, Response } from "express";

import { getMonthlyAssetTotalsValue } from "../../services/assetService/getMonthlyAssetTotalsValue";

export const getMonthlyAssetTotals = async (req: Request, res: Response) => {
  // #swagger.tags = ["asset"]
  const { workspaceId } = req.body;

  console.log("🍎 body: ", req.body);

  if (!workspaceId) {
    return res.status(400).send("workspaceId is required");
  }

  try {
    const data = await getMonthlyAssetTotalsValue(workspaceId);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
