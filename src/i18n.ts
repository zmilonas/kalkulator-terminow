import {format as dateFnsFormat, formatDuration as dateFnsFormatDuration} from "date-fns";
import pl from "date-fns/locale/pl/index.js";

const polish: Record<string, string> = {
   'Start date': 'Data rozpoczęcia',
   'Duration': 'Długość',
   'Result': 'Rezultat',
   'Limitation calculator': 'Kalkulator terminów'
};

export function t(s: string): string
{
   return polish[s] || s;
}

export function formatDuration(value, options) {
   return dateFnsFormatDuration(value, {locale: pl, ...options});
}

export function formatDate(date, format, options) {
   return dateFnsFormat(date, format, {locale: pl, ...options});
}

export const locale = pl;