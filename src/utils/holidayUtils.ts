import { checkHoliday } from "../services/holidayService";

export const isTodayHoliday = async (today: Date): Promise<boolean> => {
  const todayString = getTodayString(today);

  try {
    const response = await checkHoliday(todayString);
    console.log("[checkHoliday]", response);

    if (!response) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(`[CheckHoliday] ${error}`);
  }
};

const getTodayString = (today: Date): string => {
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
};
