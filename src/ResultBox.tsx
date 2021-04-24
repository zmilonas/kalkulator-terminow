import * as React from "react";
import {format, formatDuration} from "./date-helpers";
import {DateExpression, Result, Box} from "./Style";
import {SelectedDuration} from "./store";

export const ResultBox: React.FC<{
    startDate: Date;
    resultDate: Date;
    duration: SelectedDuration;
}> = ({startDate, resultDate, duration}) => {
    const formattedDuration: string = formatDuration(duration || {}) || 'chwila';
    return (
        <Box p={4} borderWidth="1px" borderRadius="sm" width={"100%"}>
            <DateExpression>
                {formattedDuration} od {format(startDate, "do MMMM yyyy")} to
            </DateExpression>
            <Result>{format(resultDate, "do MMMM yyyy")}</Result>
        </Box>
    );
};