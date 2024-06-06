import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface HolidayItem {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
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
    const response = await axios.get(url);
    const data: ApiResponse = response.data.response.body.items;

    if (isHolidayItemArray(data.item)) {
      for (const holiday of data.item) {
        if (
          holiday.locdate.toString() === todayString &&
          holiday.isHoliday === "Y"
        ) {
          return true;
        }
      }
    } else {
      if (
        data.item.locdate.toString() === todayString &&
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
