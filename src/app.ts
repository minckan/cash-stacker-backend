import express from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import stockPriceRoutes from "./routes/stockPriceRoutes";
import assetRoutes from "./routes/assetRoutes";
import userRoutes from "./routes/userRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";
import financeTrackerRoutes from "./routes/financeTrackerRoutes";
import assetTypesRoutes from "./routes/assetTypeRoutes";
import financeTrackerCategoryRoutes from "./routes/financeTrackerCategoryRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import invitationRoutes from "./routes/invitationRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";

const app = express();

app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api", exchangeRateRoutes);
app.use("/api", stockPriceRoutes);

// 유저
app.use("/users", userRoutes);
// 워크스페이스
app.use("/workspaces", workspaceRoutes);
// 자산
app.use("/:workspaceId/assets", assetRoutes);
// 가계부
app.use("/:workspaceId/finance", financeTrackerRoutes);
// 자산 타입
app.use("/:workspaceId/asset/type", assetTypesRoutes);
// 가계부 카테고리
app.use("/:workspaceId/finance/category", financeTrackerCategoryRoutes);
// 예산
app.use("/:workspaceId/budget", budgetRoutes);
// 초대
app.use("/:workspaceId/invitation", invitationRoutes);

export default app;
