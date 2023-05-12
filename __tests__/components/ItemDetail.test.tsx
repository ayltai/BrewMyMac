import React from 'react';

import { ItemDetail, } from '../../src/components/ItemDetail';
import { fireEvent, render, waitFor, } from '../../src/utils/test-utils';

import type { Item, } from '../../src/types';

const item : Item = {
    id          : '1',
    name        : 'Item 1',
    description : 'Description 1',
    source      : 'Tweak',
    parameter   : 'Value 1',
};

describe('ItemDetail', () => {
    it('does not render an input field if the source is not "Tweak"', () => {
        const { queryByRole, } = render(
            <ItemDetail
                item={{
                    ...item,
                    source : 'Homebrew',
                }} />
        );

        expect(queryByRole('textbox')).toBeNull();
    });

    it('triggers onChange when the input field is changed', async () => {
        const onChange = jest.fn();

        const { getByRole, } = render(
            <ItemDetail
                item={item}
                onChange={onChange} />
        );

        fireEvent.change(getByRole('textbox'), {
            target : {
                value : 'New Value',
            },
        });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledTimes(1);
            expect(onChange).toHaveBeenCalledWith('New Value');
        });
    });
});
