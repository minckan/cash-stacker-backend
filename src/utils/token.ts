import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";

dotenv.config();

export const generateInvitationToken = (email: string, workspaceId: string) => {
  const token = jwt.sign({ email, workspaceId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  console.log(email, token);
  return token;
};

export const verifyInvitationToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY) as {
    email: string;
    workspaceId: string;
  };
  // 디비에서 토큰 검색
  const invitation = prisma.invitation.findFirst({
    where: { email: decoded.email, workspace_id: decoded.workspaceId },
  });
  const hashedToken = (await invitation).token;
  const isMatch = await bcrypt.compare(token, hashedToken);

  return {
    isMatch,
    email: decoded.email,
    workspaceId: decoded.workspaceId,
  };
};
