import express from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import stockPriceRoutes from "./routes/stockPriceRoutes";

const app = express();

app.use(express.json());
app.use("/api", exchangeRateRoutes);
app.use("/api", stockPriceRoutes);

export default app;
