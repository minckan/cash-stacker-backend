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
// TODO: 유저가 생성이 됐을때, 초대받은 유저라면 상태 변경처리?
// TODO: 유저가 생성될때 동일한 workspace를 조회해서 있다면 해당 workspace의 유저들에게 푸시알림 노티 하기.
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

/// 유저 상태 수정
export const updateUserStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { push_enable, darkMode_enable, role } = req.body;

  try {
    const original_user = await prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });
    const user = await prisma.user.update({
      where: { user_id: id },
      data: {
        push_enable: Boolean(push_enable) ?? original_user.push_enable,
        darkMode_enable:
          Boolean(darkMode_enable) ?? original_user.darkMode_enable,
        role: role ?? original_user.role,
      },
    });
    res.status(201).send({ user_id: id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user status", error: error });
  }
};
