import dotenv from "dotenv";
import axios from "axios";
import NodeCache from "node-cache";
import {
  getPreviousBusinessDay,
  getFormattedDate,
  isBusinessDay,
  isBefore11AM,
} from "../utils/dateUtils";

dotenv.config();

const apiCache = new NodeCache({ stdTTL: 3600 });
const exchangeRateApiUrl = process.env.EXCHANGE_RATE_API_URL || "";

const fetchExchangeRateFromApi = async (date: string) => {
  const params = {
    authkey: process.env.EXCHANGE_RATE_API_KEY ?? "",
    data: "AP01",
    searchdate: date,
  };
  const response = await axios.get(
    `${exchangeRateApiUrl}?${new URLSearchParams(params).toString()}`
  );
  return response.data;
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
    throw new Error("Error fetching exchange rate data");
  }
};
