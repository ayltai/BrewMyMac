import React from 'react';

import { fireEvent, render, waitFor, } from '../utils/test';

import { PopUpDialog, } from './PopUpDialog';

describe('<PopUpDialog />', () => {
    it('renders correctly', () => expect(render(<PopUpDialog title='dummy' />).asFragment()).toMatchSnapshot());

    it('triggers onClose when the close icon is clicked', async () => {
        const onClose = jest.fn();

        const { getAllByRole, } = render(
            <PopUpDialog
                open
                title='dummy'
                onClose={onClose} />
        );

        fireEvent.click(getAllByRole('button')[0]);

        await waitFor(() => {
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });

    it('triggers onClose when the close button is clicked', async () => {
        const onClose = jest.fn();

        const { getAllByRole, } = render(
            <PopUpDialog
                open
                title='dummy'
                onClose={onClose} />
        );

        fireEvent.click(getAllByRole('button')[1]);

        await waitFor(() => {
            expect(onClose).toHaveBeenCalledTimes(1);
        });
    });
});
