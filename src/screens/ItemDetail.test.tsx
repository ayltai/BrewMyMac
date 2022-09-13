import React from 'react';

import { Item, } from '../models';
import { fireEvent, render, waitFor, } from '../utils/test';

import { ItemDetail, } from './ItemDetail';

const ITEM : Item = {
    id        : 'dummy_id',
    name      : 'dummy_name',
    source    : 'Tweak',
    parameter : 'dummy_parameter',
};

describe('<ItemDetail />', () => {
    it('does not render an input', () => {
        const { queryByRole, } = render(
            <ItemDetail item={{
                ...ITEM,
                source : 'Homebrew',
            }} />
        );

        expect(queryByRole('textbox')).toBeNull();
    });
});

describe('<ItemDetail />', () => {
    it('triggers onChange when input text is changed', async () => {
        const handleChange = jest.fn();

        const { getByRole, } = render(
            <ItemDetail
                item={ITEM}
                onChange={handleChange} />
        );

        fireEvent.change(getByRole('textbox'), {
            target : {
                value : 'new value',
            },
        });

        await waitFor(() => {
            expect(handleChange).toHaveBeenCalledWith('new value');
        });
    });
});
