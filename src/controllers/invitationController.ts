import { Request, Response } from "express";
import prisma from "../prisma/client";
import { sendAndCreateInvitation } from "../services/invitationService/createInvitation";
import { verifyInvitationToken } from "../utils/token";

// 초대 생성
export const createInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId } = req.params;
  const { email } = req.body;
  try {
    const invitation = await sendAndCreateInvitation(workspaceId, email);
    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create invitation", error });
  }
};

// 초대 삭제
export const deleteInvitation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.invitation.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete invitation", error });
  }
};

// 워크스페이스에서 발송한 전체 초대 조회
export const getAllInvitations = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { workspaceId } = req.params;
  try {
    const invitations = await prisma.invitation.findMany({
      where: { workspace_id: workspaceId },
    });
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invitations", error });
  }
};

// 초대 토큰 검증
export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body;
  try {
    // 토큰 체크
    const { isMatch, email, workspaceId } = await verifyInvitationToken(token);
    if (!isMatch) {
      res.status(400).send("invalid Or expired token");
    }

    res.status(200).send({
      tokenMatched: true,
      email,
      workspaceId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update invitation" });
  }
};
