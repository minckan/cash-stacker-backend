import { Request, Response } from "express";
import prisma from "../prisma/client";

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
  } = req.body;

  if (!workspace_id || !username || !email) {
    return res
      .status(400)
      .send({ error: "workspace_id, username, and email are required" });
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
      },
    });
    res.status(201).send({ user_id });
  } catch (error) {
    res.status(500).send({ message: "Failed to create user", error: error });
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
    res.status(500).json({ error: "Failed to update user status" });
  }
};
