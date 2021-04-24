import {Duration} from "date-fns";
import * as React from "react";

export type SelectedDuration = Duration | null;

interface Context {
    duration: SelectedDuration;
    setDuration: (key: SelectedDuration) => void;
}

export const defaultDuration: SelectedDuration = {months: 1};
export const defaultStartDate: Date = new Date();
export const DurationCtx = React.createContext<Context>({
    duration: defaultDuration,
    setDuration: () => {
    },
});

export function useDuration(): [Context['duration'], Context['setDuration']] {
    const [duration, localSetDuration] = React.useState<SelectedDuration>(defaultDuration);
    const setDuration = React.useCallback((value) => {
        localSetDuration(value);
    }, []);
    return [duration, setDuration];
}
