import axios from "axios";
import dotenv from "dotenv";
import https from "https";

dotenv.config();

interface HolidayItem {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locate: number;
  seq: number;
}

interface ApiResponseArray {
  item: HolidayItem[];
}

interface ApiResponseObject {
  item: HolidayItem;
}

type ApiResponse = ApiResponseArray | ApiResponseObject;

const holidayApiUrl = process.env.HOLIDAY_API_URL;

const isHolidayItemArray = (item: any): item is HolidayItem[] => {
  return Array.isArray(item);
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const isTodayHoliday = async (today: Date): Promise<boolean> => {
  const todayString = getTodayString(today);
  const year = `${today.getFullYear()}`;
  const month =
    today.getMonth() < 10
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`;

  const params = {
    serviceKey: process.env.HOLIDAY_API_KEY ?? "",
    solYear: year,
    solMonth: month,
  };

  const url = `${holidayApiUrl}?${new URLSearchParams(params).toString()}`;

  try {
    const response = await axios.get(url, { httpsAgent });

    const data: ApiResponse = response.data.response.body.items;

    if (!data.item) {
      return false;
    }
    if (isHolidayItemArray(data.item)) {
      for (const holiday of data.item) {
        if (
          holiday.locate.toString() === todayString &&
          holiday.isHoliday === "Y"
        ) {
          return true;
        }
      }
    } else {
      if (
        data.item.locate.toString() === todayString &&
        data.item.isHoliday === "Y"
      ) {
        return true;
      }
    }
  } catch (error) {
    console.error("Error fetching holiday data:", error);
  }

  return false;
};

const getTodayString = (today: Date): string => {
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
};
