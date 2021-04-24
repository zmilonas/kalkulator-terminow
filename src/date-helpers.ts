import {format as dateFnsFormat, formatDuration as dateFnsFormatDuration} from "date-fns";
import Holidays, {Holiday as libHoliday} from "date-holidays";
import * as React from "react";

export type Holiday = libHoliday;

export const format: typeof dateFnsFormat = (date, format, options): string => {
    const context = React.useContext(DateHelperContext);
    return context.format(date, format, options);
}
export const formatDuration: typeof dateFnsFormatDuration = (value, options) => {
    const context = React.useContext(DateHelperContext);
    return context.formatDuration(value, options);
};

export function dayOfMonth(date: Date): string {
    return format(date, "d MMMM");
}

const hd = new Holidays({
    country: "PL",
});

export function getHoliday(date: Date): false | Holiday[] {
    return hd.isHoliday(date);
}

export function isBankHoliday(date: Date): boolean {
    return getHoliday(date) !== false;
}

export const DateHelperContext = React.createContext<{
    format: typeof dateFnsFormat,
    formatDuration: typeof dateFnsFormatDuration,
}>(undefined);

