import { Request, Response } from "express";
import prisma from "../prisma/client";

interface CreateWorkspaceResponse {
  workspaceId: string;
}

/// 워크스페이스 생성
export const createWorkspace = async (req: Request, res: Response) => {
  const { workspace_name, workspace_id } = req.body;

  if (!workspace_id) {
    return res.status(400).send({ error: "workspace_id are required" });
  }

  try {
    const newWorkspace = await prisma.workspace.create({
      data: {
        workspace_name: workspace_name ?? "",
        workspace_id,
      },
    });
    res.status(201).send({ workspace_id });
  } catch (error) {
    res.status(500).send({ message: "Failed to create workspace", error });
  }
};

/// 워크스페이스 전체 조회
export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const allWorkspaces = await prisma.workspace.findMany();
    res.status(200).send(allWorkspaces);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve workspaces" });
  }
};

/// 단일 워크스페이스 조회
export const getWorkspaceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oneWorkspace = await prisma.workspace.findUnique({
      where: { workspace_id: id },
    });
    if (oneWorkspace) {
      res.status(200).send(oneWorkspace);
    } else {
      res.status(404).send({ error: "Workspace not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve workspace" });
  }
};
