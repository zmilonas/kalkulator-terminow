/**
 * @jest-environment node
 */
import { formatDuration, parseISO } from "date-fns";
import 'jest-date';
import { countDates } from "./count-dates";

describe("countDates", () => {
  function run(
    inputISODate: string,
    duration: Duration,
    expectedISODate: string,
    comment?: string,
  ) {
    const testName = comment ||
      `returns ${expectedISODate} for ${
        formatDuration(duration)
      } added to ${inputISODate}`;
    it(testName, () => {
      const inputDate = parseISO(`${inputISODate} 13:00`); // Using middle of the day to compensate for potential DST changes
      const outputDate = parseISO(`${expectedISODate} 13:00`);
      const [countedDate] = countDates(inputDate, duration);

      expect(countedDate).toBeSameDayAs(outputDate);
    });
  }

  run("2020-01-31", { months: 1 }, "2020-03-02");
  run("2020-02-29", { months: 1 }, "2020-03-30");
  run("2020-12-31", { months: 2 }, "2021-03-01");
  run("2020-12-31", { months: 2 }, "2021-03-01");
  run("2020-11-30", { months: 3 }, "2021-03-01");
  run("2020-01-30", { months: 12 }, "2021-02-01", "works for 12 months landing on saturday");
  run("2020-03-29", { days: 14 }, "2020-04-14", "works around easter 2020");
  run("2021-03-05", { days: 7 }, "2021-03-12");
  run("2021-09-10", { months: 3}, "2021-12-10");
  run("2021-09-01", { months: 4}, "2022-01-03");
  run("2021-04-30", { days: 1 }, "2021-05-04");
});
