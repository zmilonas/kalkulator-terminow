import * as React from "react";
import {Duration} from "date-fns";
import {DurationCtx} from "./store";
import {shallowEqual} from "shallow-equal-object";
import {Pill, SelectedPill} from "./Style";
import {formatDuration} from "./date-helpers";

export const Entry: React.FC<{ value: Duration }> = ({value}) => {
    const state = React.useContext(DurationCtx);
    const chosen: boolean = shallowEqual(value, state.duration);
    const onClick = () => {
        state.setDuration(!chosen ? value : null);
    };
    const Component = chosen ? SelectedPill : Pill;

    return (
        <Component onClick={onClick} role={'radio'} aria-checked={chosen}>
            {formatDuration(value, {delimiter: "&nbsp;"})}
        </Component>
    );
};