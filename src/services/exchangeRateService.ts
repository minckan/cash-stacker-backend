import axios from "axios";
import NodeCache from "node-cache";
import { subDays } from "date-fns";
import dotenv from "dotenv";

dotenv.config();

const apiCache = new NodeCache({ stdTTL: 3600 });
const exchangeRateApiUrl = process.env.EXCHANGE_RATE_API_URL || "";

console.log(process.env.EXCHANGE_RATE_API_KEY);

const isBusinessDay = (date: Date): boolean => {
  const day = date.getDay();
  return day !== 0 && day !== 6; // Sunday is 0, Saturday is 6
};

const isBefore11AM = (date: Date): boolean => {
  const hour = date.getHours();
  return hour < 11;
};

const getPreviousBusinessDay = (date: Date): Date => {
  let prevBusinessDay = subDays(date, 1);
  while (!isBusinessDay(prevBusinessDay)) {
    prevBusinessDay = subDays(prevBusinessDay, 1);
  }
  return prevBusinessDay;
};

const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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

  if (!isBusinessDay(now) || isBefore11AM(now)) {
    dateToFetch = getPreviousBusinessDay(now);
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
