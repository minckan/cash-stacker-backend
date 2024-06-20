import dotenv from "dotenv";
import axios from "axios";
import NodeCache from "node-cache";
import {
  getPreviousBusinessDay,
  getFormattedDate,
  isBusinessDay,
  isBefore11AM,
} from "../utils/dateUtils";
import { logger } from "express-winston";

dotenv.config();

const apiCache = new NodeCache({ stdTTL: 3600 });
const exchangeRateApiUrl = process.env.EXCHANGE_RATE_API_URL || "";

const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const fetchExchangeRateFromApi = async (date: string) => {
  const params = {
    authkey: process.env.EXCHANGE_RATE_API_KEY ?? "",
    data: "AP01",
    searchdate: date,
  };

  try {
    const response = await axios.get(
      `${exchangeRateApiUrl}?${new URLSearchParams(params).toString()}`,
      { httpsAgent: agent, maxRedirects: 1 }
    );

    return response.data;
  } catch (error) {
    console.log("[ERROR in fetchExchangeRateFromApi] ", error);
    console.log("[ERROR in fetchExchangeRateFromApi] ", error.code);

    throw new Error(error);
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
    throw new Error(error);
  }
};
