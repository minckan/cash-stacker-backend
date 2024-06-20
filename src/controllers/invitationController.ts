import { Request, Response } from "express";
import prisma from "../prisma/client";

// 초대 생성
export const createInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["invitation"]
  const { workspaceId } = req.params;
  const { email, status, token, expiry_date } = req.body;
  try {
    const invitation = await prisma.invitation.create({
      data: {
        workspace_id: workspaceId,
        email,
        status,
        token,
        expiry_date: new Date(expiry_date),
      },
    });
    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create invitation" });
  }
};

// 초대 상태 업데이트
export const updateInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["invitation"]
  const { id } = req.params;
  const { status } = req.body;
  try {
    const invitation = await prisma.invitation.update({
      where: { id },
      data: {
        status,
      },
    });
    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: "Failed to update invitation" });
  }
};

// 초대 삭제
export const deleteInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["invitation"]
  const { id } = req.params;
  try {
    await prisma.invitation.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete invitation" });
  }
};

// 워크스페이스에서 발송한 전체 초대 조회
export const getAllInvitations = async (
  req: Request,
  res: Response
): Promise<void> => {
  // #swagger.tags = ["invitation"]
  const { workspaceId } = req.params;
  try {
    const invitations = await prisma.invitation.findMany({
      where: { workspace_id: workspaceId },
    });
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invitations" });
  }
};
