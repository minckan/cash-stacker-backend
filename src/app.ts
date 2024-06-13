import express from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import stockPriceRoutes from "./routes/stockPriceRoutes";
import assetRoutes from "./routes/assetRoutes";
import userRoutes from "./routes/userRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";

const app = express();

app.use(express.json());
app.use("/api", exchangeRateRoutes);
app.use("/api", stockPriceRoutes);
app.use("/api", assetRoutes);

app.use("/users", userRoutes);
app.use("/workspaces", workspaceRoutes);
app.use("/:workspaceId/assets", workspaceRoutes);
app.use("/:workspaceId/financeTracker", workspaceRoutes);

export default app;
