import dotenv from "dotenv";
import axios from "axios";
import NodeCache from "node-cache";
import https from "https";
import {
  getPreviousBusinessDay,
  getFormattedDate,
  isBusinessDay,
  isBefore11AM,
} from "../utils/dateUtils";

dotenv.config();

const apiCache = new NodeCache({ stdTTL: 3600 });
const exchangeRateApiUrl = process.env.EXCHANGE_RATE_API_URL || "";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // 인증서 검증 무시
});

const fetchExchangeRateFromApi = async (date: string) => {
  const params = {
    authkey: process.env.EXCHANGE_RATE_API_KEY ?? "",
    data: "AP01",
    searchdate: date,
  };

  try {
    console.log(
      `${exchangeRateApiUrl}?${new URLSearchParams(params).toString()}`
    );
    const response = await axios.get(
      `${exchangeRateApiUrl}?${new URLSearchParams(params).toString()}`,
      {
        httpsAgent,
        maxRedirects: 5, // 리다이렉션 자동 추적 비활성화
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`[fetchExchangeRateFromApi] ${error}`);
  }
};

export const getExchangeRate = async () => {
  const now = new Date();
  let dateToFetch = now;

  if (!(await isBusinessDay(now)) || isBefore11AM(now)) {
    dateToFetch = await getPreviousBusinessDay(now);
  }

  const formattedDate = getFormattedDate(dateToFetch);
  const cacheKey = `exchangeRateData-${formattedDate}`;
  const cachedData = apiCache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const data = await fetchExchangeRateFromApi(formattedDate);

    apiCache.set(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(`[getExchangeRate] ${error}`);
  }
};
