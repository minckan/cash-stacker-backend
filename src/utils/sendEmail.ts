import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createDynamicLink } from "./dynamicLink";

dotenv.config();

export const sendEmail = async ({ email, token }) => {
  try {
    const BUSINESS_NAME = "Cash Stacker";
    const deepLink = await createDynamicLink(email, token);

    if (!deepLink) {
      throw new Error("dynamic link 생성중 문제가 발생했습니다.");
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // 서버 호스트명
      port: 587, // SSL은 465 TLS는 587 (이메일 프로바이더에 따라 포트번호는 상이할 수 있습니다)
      secure: false, // SSL은 true TLS는 false
      auth: {
        user: process.env.ADMIN_ID,
        pass: process.env.ADMIN_PWD,
      },
    });

    let mailOptions = {
      from: process.env.ADMIN_ID,
      to: email,
      subject: `You are invited to ✨${BUSINESS_NAME}✨!`,
      text: `You have been invited to join. Click the link to accept: ${deepLink}`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending mail: ", error);
        throw new Error(`Error sending mail: ${error}`);
      } else {
        console.log("success:", info.response);
        return info.response;
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};
