import * as React from "react";
import {Duration} from "date-fns";
import {HStack, Input} from "@chakra-ui/react";
import {DurationCtx} from "./store";
import {Entry} from "./Entry";

export const DurationRow: React.FC<{
    choices: number[];
    unit: keyof Duration
}> = ({
          choices,
          unit,
      }) => {
    const state = React.useContext(DurationCtx);
    const onInputChange = (event) => {
        const val = event?.target?.value;
        if (typeof val !== "string") {
            return;
        }
        if (val === "") {
            state.setDuration(null);
            return;
        }

        const parsed: number = parseInt(val);
        if (isNaN(parsed) || parsed < 1) {
            return;
        }

        state.setDuration({[unit]: parsed});
    };
    const inputValue = state.duration?.[unit] || "";

    return (
        <HStack justify={"space-between"} width={"100%"}>
            {choices.map((num) => (
                <Entry value={{[unit]: num}} key={unit + num}/>
            ))}
            <Input
                size="xs"
                maxWidth="3rem"
                onChange={onInputChange}
                value={inputValue}
            />
        </HStack>
    );
};