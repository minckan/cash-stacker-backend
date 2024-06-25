import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";

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
    console.log("Token is valid:", decodedToken);
    const user = await admin.auth().getUser(decodedToken.uid);
    if (user) {
      next();
    }
  } catch (error) {
    if (error.code === "auth/id-token-expired") {
      console.error("ID token has expired:", error);
      throw error;
    } else {
      console.error("Error verifying ID token:", error);
      throw error;
    }
  }
}
