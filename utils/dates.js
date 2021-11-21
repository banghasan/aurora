import {
  subHours,
  subDays,
  subYears,
  startOfToday,
  startOfWeek,
  startOfMonth,
  startOfYear,
} from "date-fns";

export function localize(date) {
  return new Date(date).toLocaleDateString();
}

export function getTimestamps(filter) {
  switch (filter) {
    case "LAST_24_HOURS":
      return {
        start: subHours(new Date(), 24),
        end: new Date(),
        unit: "hour",
      };

    case "LAST_7_DAYS":
      return {
        start: subDays(new Date(), 7),
        end: new Date(),
        unit: "day",
      };

    case "LAST_30_DAYS":
      return {
        start: subDays(new Date(), 30),
        end: new Date(),
        unit: "day",
      };

    case "LAST_90_DAYS":
      return {
        start: subDays(new Date(), 90),
        end: new Date(),
        unit: "day",
      };

    case "LAST_YEAR":
      return {
        start: subYears(new Date(), 1),
        end: new Date(),
        unit: "month",
      };

    case "TODAY":
      return {
        start: startOfToday(new Date()),
        end: new Date(),
        unit: "hour",
      };

    case "THIS_WEEK":
      return {
        start: startOfWeek(new Date()),
        end: new Date(),
        unit: "day",
      };

    case "THIS_MONTH":
      return {
        start: startOfMonth(new Date()),
        end: new Date(),
        unit: "day",
      };

    case "THIS_YEAR":
      return {
        start: startOfYear(new Date()),
        end: new Date(),
        unit: "month",
      };

    default:
      return {
        start: subHours(new Date(), 24),
        end: new Date(),
        unit: "hour",
      };
  }
}
