import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decodedToken: ", decodedToken);
    console.log("decodedToken.uid: ", decodedToken.uid);
    const user = await admin.auth().getUser(decodedToken.uid);
    if (user) {
      next();
    }
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    res.status(403).send("Forbidden: Invalid token");
  }
}
