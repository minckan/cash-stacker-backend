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
  } = req.body;

  if (!workspace_id || !username || !email) {
    return res
      .status(400)
      .send({ error: "workspace_id, username, and email are required" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
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
      },
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
};
