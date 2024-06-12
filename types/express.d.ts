import * as express from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}
