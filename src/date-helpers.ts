import {format as dateFnsFormat, formatDuration as dateFnsFormatDuration} from "date-fns";
import dateFnsLocalePL from "date-fns/locale/pl/index.js";
import Holidays, {Holiday as libHoliday} from "date-holidays";

export type Holiday = libHoliday;

export const format: typeof dateFnsFormat = (date, format): string => {
    return dateFnsFormat(date, format, {locale: dateFnsLocalePL});
}
export const formatDuration: typeof dateFnsFormatDuration = (value, options) => {
    return dateFnsFormatDuration(value, {locale: dateFnsLocalePL, ...options});
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

