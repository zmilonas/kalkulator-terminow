import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {DurationRow} from "./DurationRow";
import {DurationCtx, SelectedDuration} from './store';
import { DateHelperContext } from './date-helpers';

const formatDuration = (duration) => {
    const unit = Object.keys(duration)[0];
    return `${duration[unit]} ${unit}`;
}

const unit = 'days';
const choices = [1, 2, 3, 4, 5, 6, 7];

const helper = (duration: SelectedDuration = {}) => (
    <DurationCtx.Provider value={{duration, setDuration: () => {} }}>
        <DateHelperContext.Provider value={{ formatDuration, format: () => ('') }}>
            <DurationRow unit={unit} choices={choices} />
        </DateHelperContext.Provider>
    </DurationCtx.Provider>
)

test('returns as many radios as there are choices', () => {
    render(helper());
    expect(screen.getAllByRole('radio').length).toEqual(choices.length);
});

test('no radio is checked by default', () => {
    const choices = [1, 2, 3, 4, 5, 6, 7];
    render(helper());

    screen.getAllByRole('radio').forEach((radio) => expect(radio).not.toBeChecked());
});

test('selected entry is checked', () => {
    const duration = { [unit]: 2 };

    render(helper(duration));

    expect(screen.getByText(formatDuration(duration))).toBeChecked();
})
