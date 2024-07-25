import { Request, Response } from "express";
import { fetchPortfolio } from "../services/portfolioService";

export const getPortfolio = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;

  try {
    const portfolio = await fetchPortfolio(workspaceId);

    console.log(portfolio);
    res.status(201).send(portfolio);
  } catch (error) {
    res.status(500).send({ message: "[ERROR] getAssets", error });
  }
};
