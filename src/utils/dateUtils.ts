import { subDays } from "date-fns";
import { isTodayHoliday } from "./holidayUtils";

export const getTodayString = (today: Date): string => {
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
};

export const isBefore11AM = (date: Date): boolean => {
  const hour = date.getHours();
  return hour < 11;
};

export const getPreviousBusinessDay = async (date: Date): Promise<Date> => {
  try {
    let prevBusinessDay = subDays(date, 1);

    while (!(await isBusinessDay(prevBusinessDay))) {
      prevBusinessDay = subDays(prevBusinessDay, 1);
    }
    return prevBusinessDay;
  } catch (error) {
    throw new Error(`[getPreviousBusinessDay] ${error.message}`);
  }
};

export const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isBusinessDay = async (date: Date): Promise<boolean> => {
  try {
    const day = date.getDay();
    const holiday = await isTodayHoliday(date);

    return day !== 0 && day !== 6 && !holiday; // Sunday is 0, Saturday is 6
  } catch (error) {
    throw new Error(`[Check Business Day] ${error.message}`);
  }
};
