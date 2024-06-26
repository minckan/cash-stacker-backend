import * as express from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

declare global {
  namespace Express {
    interface Request {
      user?: UserRecord;
    }
  }
}
