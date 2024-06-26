import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send("Unauthorized: No token provided or token format is incorrect");
  }

  const token = authHeader.split(" ")[1];

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
      return res.status(401).send("Unauthorized: ID token has expired");
    } else {
      console.error("Error verifying ID token:", error);
      return res.status(401).send("Unauthorized: Error verifying ID token");
    }
  }
}
