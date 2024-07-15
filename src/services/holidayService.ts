import https from "https";
import axios from "axios";
import prisma from "../prisma/client";

interface HolidayItem {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

const API_URL =
  "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";

export const getHolidayByYear = async (year: string) => {
  const params = {
    serviceKey: process.env.HOLIDAY_API_KEY ?? "",
    solYear: year,
    _type: "json",
    numOfRows: "100",
  };
  const url = `${API_URL}?${new URLSearchParams(params).toString()}`;
  try {
    const response = await axios.get(url);
    return response.data["response"]["body"]["items"]["item"] as HolidayItem[];
  } catch (error) {
    throw new Error(error);
  }
};

export const saveHoliday = async (holidays: HolidayItem[]) => {
  try {
    for (const holiday of holidays) {
      await prisma.holiday.create({
        data: holiday,
      });
    }
    console.log("Holidays have been added to the database.");
  } catch (error) {
    throw new Error(error);
  }
};

export const checkHoliday = async (dateKey: string) => {
  try {
    const holiday = await prisma.holiday.findFirst({
      where: {
        locdate: parseInt(dateKey),
      },
    });

    return holiday;
  } catch (error) {
    throw new Error(error);
  }
};
