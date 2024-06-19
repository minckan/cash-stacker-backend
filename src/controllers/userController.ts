import { Request, Response } from "express";
import prisma from "../prisma/client";

/// 유저 조회
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "유저 아이디는 필수입니다." });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { user_id: id },
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(200).send(null);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "유효하지 않은 아이디 입니다.", error: error });
  }
};

/// 유저 생성
export const createUser = async (req: Request, res: Response) => {
  const {
    workspace_id,
    username,
    email,
    login_type,
    role,
    push_enable,
    darkMode_enable,
    profile_image,
    push_id,
    joined_at,
    created_at,
    user_id,
    platform_type,
  } = req.body;

  if (!workspace_id || !username || !email) {
    return res
      .status(400)
      .send({ error: "workspace_id, username, and email 는 필수입니다" });
  }

  try {
    await prisma.user.create({
      data: {
        workspace_id,
        user_id,
        username,
        email,
        login_type,
        role,
        push_enable,
        darkMode_enable,
        profile_image,
        push_id,
        joined_at,
        created_at,
        platform_type,
      },
    });
    res.status(201).send({ user_id });
  } catch (error) {
    res.status(500).send({ message: "유저 생성 실패", error: error });
  }
};

// 유저 상태 수정
export const updateUserStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { push_enable, darkMode_enable, role } = req.body;

  try {
    const user = await prisma.user.update({
      where: { user_id: id },
      data: {
        push_enable: Boolean(push_enable),
        darkMode_enable: Boolean(darkMode_enable),
        role: role,
      },
    });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user status", error: error });
  }
};
