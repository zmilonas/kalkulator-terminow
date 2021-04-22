import {add, Duration, getMonth, isWeekend, lastDayOfMonth,} from "date-fns";
import {isBankHoliday} from "./date-helpers";

export enum SKIP_REASON {
    LAST_DAY_OF_MONTH,
    WEEKEND,
    BANK_HOLIDAY
}

export type SkippedDay = {
    date: Date,
    reason: SKIP_REASON,
}

export function countDates(startDate: Date, dur: Duration, _skipped: SkippedDay[] = []): [Date, SkippedDay[]] {
    const result = add(startDate, dur);

    const skip = (reason: SKIP_REASON): SkippedDay[] => ([..._skipped, { date: result, reason }]);

    if (dur.months && (getMonth(startDate) + dur.months) % 11 !== getMonth(result)) {
        const lastDayOfDesiredMonth = lastDayOfMonth(result);
        return countDates(lastDayOfDesiredMonth, {}, skip(SKIP_REASON.LAST_DAY_OF_MONTH));
    }

    if (isWeekend(result)) {
        return countDates(result, {days: 1}, skip(SKIP_REASON.WEEKEND));
    }

    if (isBankHoliday(result)) {
        return countDates(result, {days: 1}, skip(SKIP_REASON.BANK_HOLIDAY));
    }

    return [result, _skipped];
}
