import * as React from "react";
import {SKIP_REASON, SkippedDay} from "./count-dates";
import {dayOfMonth, format, getHoliday, Holiday} from "./date-helpers";
import {lastDayOfMonth} from "date-fns";
import {Explanation} from "./Style";

export const Explanations: React.FC<{ data: SkippedDay[] }> = ({data}) => {
    if (!data.length) {
        return null;
    }

    const explanationMap: Record<SKIP_REASON, (d: Date) => string> = {
        [SKIP_REASON.WEEKEND]: (date) =>
            `${dayOfMonth(date)} to ${format(date, "cccc")}`,
        [SKIP_REASON.LAST_DAY_OF_MONTH]: (date) =>
            `Ostatni dzień ${format(date, "MMMM")} to ${dayOfMonth(
                lastDayOfMonth(date)
            )}`,
        [SKIP_REASON.BANK_HOLIDAY]: (date) => {
            const holidayName = (getHoliday(date)[0] as Holiday).name;
            return `${dayOfMonth(date)} to ${holidayName}`;
        },
    };
    const explanations = data.map(({date, reason}) =>
        explanationMap[reason](date)
    );
    return (
        <Explanation>
            Wyjaśnienie:
            {explanations.map((text) => (
                <p>{text}</p>
            ))}
        </Explanation>
    );
};