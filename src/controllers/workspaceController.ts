import { Request, Response } from "express";
import prisma from "../prisma/client";

/// 워크스페이스 생성
export const createWorkspace = async (req: Request, res: Response) => {
  const { workspace_name, workspace_id, created_at } = req.body;

  if (!workspace_id) {
    return res
      .status(400)
      .send({ error: "workspace_id, username, and email are required" });
  }

  try {
    const newWorkspace = await prisma.workspace.create({
      data: {
        workspace_name,
        workspace_id,
        created_at,
      },
    });
    res.status(201).send(newWorkspace);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
};

/// 워크스페이스 전체 조회
export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const allWorkspaces = await prisma.workspace.findMany();
    res.status(201).send(allWorkspaces);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
};

/// 단일 워크스페이스 조회
export const getWorkspaceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oneWorkspace = await prisma.workspace.findUnique({
      where: { workspace_id: Number(id) },
    });
    res.status(201).send(oneWorkspace);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
};
