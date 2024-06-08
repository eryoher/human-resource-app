import { differenceInMonths, differenceInYears, format } from "date-fns";

export const getFormattedDate = (
  date: string
): { formattedDate: string; tenure: string } => {
  const hireDate = new Date(`${date}T00:00`);
  const today = new Date();

  const years = differenceInYears(today, hireDate);
  const months = differenceInMonths(today, hireDate) % 12;
  // const days = differenceInDays(today, hireDate) % 30;
  const days = parseInt(format(today, "d")) - parseInt(format(hireDate, "d"));

  const formattedDate = format(hireDate, "MMMM d, yyyy");
  const tenure = `${years}y – ${months}m – ${days}d`;

  return { formattedDate, tenure };
};
