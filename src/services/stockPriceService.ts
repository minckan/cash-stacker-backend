import axios from "axios";
import NodeCache from "node-cache";

const apiCache = new NodeCache({ stdTTL: 3600 });
const stockPriceApiUrl = "https://api.example.com/stock-prices";

export const getStockPrice = async (symbol: string) => {
  const cacheKey = `stockPriceData-${symbol}`;
  const cachedData = apiCache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${stockPriceApiUrl}?symbol=${symbol}`);
    apiCache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching stock price data for symbol ${symbol}`);
  }
};
