import express from "express";
import exchangeRateRoutes from "./routes/exchangeRateRoutes";
import stockPriceRoutes from "./routes/stockPriceRoutes";
import assetRoutes from "./routes/assetRoutes";
import userRoutes from "./routes/userRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";
import financeTrackerRoutes from "./routes/financeTrackerRoutes";
import assetTypesRoutes from "./routes/assetTypeRoutes";
import holidayRoutes from "./routes/holidayRoutes";
import financeTrackerCategoryRoutes from "./routes/financeTrackerCategoryRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import invitationRoutes from "./routes/invitationRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import winston from "winston";
import expressWinston from "express-winston";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const app = express();

app.use(express.json());

const swaggerSpec = YAML.load(path.join(__dirname, "../build/swagger.yaml"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 요청과 응답을 로그로 남기는 미들웨어 설정
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "request.log" }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    requestWhitelist: [...expressWinston.requestWhitelist, "body"],
    responseWhitelist: [...expressWinston.responseWhitelist, "body"],
    ignoreRoute: function (req, res) {
      // 무시할 경로를 설정할 수 있습니다.
      return false;
    },
  })
);

app.use("/api", exchangeRateRoutes);
app.use("/api", stockPriceRoutes);
app.use("/api", holidayRoutes);

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
// 포트폴리오
app.use("/:workspaceId/portfolio", portfolioRoutes);

export default app;
