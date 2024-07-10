import { Budget } from "@prisma/client";

export const isTodayInBudgetPeriod = (start_date: Date, end_date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(start_date);
  const end = new Date(end_date);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return today >= start && today <= end;
};
