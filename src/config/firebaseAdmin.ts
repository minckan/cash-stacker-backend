import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

// Secret Manager 클라이언트 초기화
const client = new SecretManagerServiceClient();

async function getSecret(secretName: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: secretName,
  });

  const payload = version.payload?.data?.toString();
  if (!payload) {
    throw new Error("Secret payload is empty");
  }

  return payload;
}

async function initializeFirebaseAdmin() {
  // 비밀 파일 경로를 환경변수에서 가져오기
  const secretFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS_SECRET;
  if (!secretFilePath) {
    console.error(
      "GOOGLE_APPLICATION_CREDENTIALS_SECRET environment variable is not set."
    );
    process.exit(1);
  }

  // const serviceAccountPath = path.resolve(__dirname, secretFilePath);

  // 비밀 파일을 읽기
  console.log(
    "================================================================"
  );
  const keyJson = fs.readFileSync(secretFilePath, "utf8");
  console.log(keyJson);
  console.log(
    "================================================================"
  );

  // Firebase Admin SDK 초기화
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(keyJson)),
  });

  console.log("Firebase Admin SDK initialized.");
}

initializeFirebaseAdmin().catch((error) => {
  console.error("Error initializing Firebase Admin SDK::::::::", error);
  process.exit(1);
});

export default admin;
