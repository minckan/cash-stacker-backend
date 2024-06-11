import * as admin from "firebase-admin";
import * as path from "path";

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    "GOOGLE_APPLICATION_CREDENTIALS environment variable is not set."
  );
  process.exit(1);
}

const serviceAccountPath = path.resolve(
  __dirname,
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export default admin;
