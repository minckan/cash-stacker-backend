import express from "express";
import {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
} from "../controllers/workspaceController";

const router = express.Router();

router.post("/", createWorkspace);
router.get("/", getWorkspaces);
router.get("/:id", getWorkspaceById);

export default router;
