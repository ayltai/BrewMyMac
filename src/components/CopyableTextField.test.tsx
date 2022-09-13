import React from 'react';

import { fireEvent, render, waitFor, } from '../utils/test';

import { CopyableTextField, } from './CopyableTextField';

const DUMMY_VALUE = 'dummy value';

Object.assign(navigator, {
    clipboard: {
        writeText : jest.fn(),
    },
});

describe('<CopyableTextField />', () => {
    const mockedWriteText = jest.spyOn(navigator.clipboard, 'writeText');

    it('copies input value to clipboard', async () => {
        const { getByRole, } = render(<CopyableTextField value={DUMMY_VALUE} />);

        fireEvent.click(getByRole('button'));

        await waitFor(() => {
            expect(mockedWriteText).toHaveBeenCalledWith(DUMMY_VALUE);
        });
    });
});
