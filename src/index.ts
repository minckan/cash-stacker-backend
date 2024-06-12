import app from "./app";
import dotenv from "dotenv";
import admin from "./config/firebaseAdmin";

dotenv.config();

const port = process.env.PORT || 8080;

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
