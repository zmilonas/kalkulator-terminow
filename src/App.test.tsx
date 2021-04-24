import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';

const i18nMock = {
    t: (s) => (s),
}

afterEach(cleanup)

test('returns "8 stycznia" for "7 dni" selected', () => {
    render(<App i18n={i18nMock} />)

    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '01/01/2021'}});
    screen.getByText('7 dni').click();
    expect(screen.getByLabelText('Result')).toHaveTextContent('8 stycznia 2021');
})
