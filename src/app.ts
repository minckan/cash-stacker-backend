import express from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import stockPriceRoutes from "./routes/stockPriceRoutes";
import assetRoutes from "./routes/assetRoutes";

const app = express();

app.use(express.json());
app.use("/api", exchangeRateRoutes);
app.use("/api", stockPriceRoutes);
app.use("/api", assetRoutes);

export default app;
