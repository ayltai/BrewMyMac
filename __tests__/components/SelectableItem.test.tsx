import React from 'react';

import { SelectableItem, } from '../../src/components';
import { preferencesSlice, } from '../../src/states/preferencesSlice';
import { shoppingCartSlice, } from '../../src/states/shoppingCartSlice';
import { fireEvent, render, waitFor, } from '../../src/utils/test-utils';

import type { Item, } from '../../src/types';

const item : Item = {
    id          : '1',
    name        : 'Item 1',
    description : 'Description 1',
    source      : 'Tweak',
    parameter   : 'Value 1',
};

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch : () => mockUseDispatch,
}));

describe('SelectableItem', () => {
    beforeEach(() => mockUseDispatch.mockClear());

    it('dispatches addItem when an unselected item is clicked', async () => {
        const { getByRole, } = render(<SelectableItem item={item} />);

        fireEvent.click(getByRole('gridcell'));

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : `${shoppingCartSlice.name}/addItem`,
                payload : item,
            });
        });
    });

    it('dispatches removeItem when an selected item is clicked', async () => {
        const { getByRole, } = render(<SelectableItem item={item} />, {
            preloadedState : {
                [preferencesSlice.name]  : {
                    locale : 'en',
                },
                [shoppingCartSlice.name] : {
                    items : [
                        item,
                    ],
                },
            },
        });

        fireEvent.click(getByRole('gridcell'));

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : `${shoppingCartSlice.name}/removeItem`,
                payload : item,
            });
        });
    });

    it('dispatches setItems when changed', async () => {
        const { getByRole, } = render(<SelectableItem item={item} />, {
            preloadedState : {
                [preferencesSlice.name]  : {
                    locale : 'en',
                },
                [shoppingCartSlice.name] : {
                    items : [
                        item,
                    ],
                },
            },
        });

        fireEvent.click(getByRole('button'));

        await waitFor(() => {
            expect(getByRole('dialog')).not.toBeNull();
        });

        fireEvent.change(getByRole('textbox'), {
            target : {
                value : 'New value',
            },
        });

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : `${shoppingCartSlice.name}/setItems`,
                payload : [
                    {
                        ...item,
                        parameter : 'New value',
                    },
                ],
            });
        });
    });
});
