import React from 'react';

import { Item, } from '../models';
import { fireEvent, render, waitFor, } from '../utils/test';

import { SelectableItem, } from './SelectableItem';

const ITEM : Item = {
    id        : 'dummy_id',
    name      : 'dummy_name',
    source    : 'Tweak',
    parameter : 'dummy_parameter',
};

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch : () => mockUseDispatch,
}));

describe('<SelectableItem />', () => {
    beforeEach(() => mockUseDispatch.mockClear());

    it('dispatches addItem when clicked', async () => {
        const { getByRole, } = render(<SelectableItem item={ITEM} />);

        fireEvent.click(getByRole('gridcell'));

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : 'session/addItem',
                payload : ITEM,
            });
        });
    });

    it('dispatches removeItem when selected and clicked', async () => {
        const { getByRole, } = render(<SelectableItem item={ITEM} />, {
            preloadedState : {
                session : {
                    items : [
                        ITEM,
                    ],
                },
            },
        });

        fireEvent.click(getByRole('gridcell'));

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : 'session/removeItem',
                payload : ITEM,
            });
        });
    });

    it('dispatches setItems when changed', async () => {
        const { getByRole, } = render(<SelectableItem item={ITEM} />, {
            preloadedState : {
                session : {
                    items : [
                        ITEM,
                    ],
                },
            },
        });

        fireEvent.click(getByRole('button'));

        await waitFor(() => {
            expect(getByRole('dialog')).toBeInTheDocument();
        });

        fireEvent.change(getByRole('textbox'), {
            target : {
                value : 'new value',
            },
        });

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : 'session/setItems',
                payload : [
                    {
                        ...ITEM,
                        parameter : 'new value',
                    },
                ],
            });
        });
    });
});
