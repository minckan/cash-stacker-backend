import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../../prisma/client";
import { generateInvitationToken } from "../../utils/token";
import { sendEmail } from "../../utils/sendEmail";

dotenv.config();

export const sendAndCreateInvitation = async (
  workspaceId: string,
  email: string
) => {
  try {
    // 1. 키유저인지 검증?
    // 2. 초대 생성 및 저장
    //초대확인을 위한 고유 토큰(유효기간 설정)
    const token = generateInvitationToken(email, workspaceId);
    const hashedToken = bcrypt.hashSync(token, 10);
    const expiry_date = new Date(Date.now() + 24 * 60 * 60 * 1000 * 7);
    const invitation = await prisma.invitation.create({
      data: {
        workspace_id: workspaceId,
        email,
        status: "WAITING",
        token: hashedToken,
        expiry_date,
      },
    });

    // 3. 초대 이메일 발송
    await sendEmail({ email, token });

    // 4. 성공시 invitation 리턴
    return {
      email: invitation.email,
      status: invitation.status,
      expiryAt: invitation.expiry_date,
    };
  } catch (error) {
    throw new Error(error);
  }
};
