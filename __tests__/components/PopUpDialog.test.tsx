import React from 'react';

import { PopUpDialog, } from '../../src/components/PopUpDialog';
import { fireEvent, render, waitFor, } from '../../src/utils/test-utils';

describe('PopUpDialog', () => {
    it('renders correctly', () => expect(render(<PopUpDialog title='dummy' />)).toMatchSnapshot());

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
