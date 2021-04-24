import React from 'react'
import {render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';

const i18nMock = {
    t: (s) => (s),
    formatDate: (date): string => (date.toDateString().substring(4)),
    formatDuration: (duration) => {
        const unit = Object.keys(duration)[0];
        return `${duration[unit]} ${unit}`;
    },
    locale: undefined,
}

test('returns a proper date for 7 day duration selected', () => {
    render(<App i18n={i18nMock} />)

    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '01/01/2021'}});
    screen.getByText('7 days').click();
    expect(screen.getByLabelText('Result')).toHaveTextContent('Jan 08 2021');
})
