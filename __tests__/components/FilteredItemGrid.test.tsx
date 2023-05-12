import React from 'react';

import { store, } from '../../src/states';
import { mockApis,render, waitFor, } from '../../src/utils/test-utils';

import { FilteredItemGrid, } from '../../src/components';

const INITIAL_FILTER = 'firefox';

describe('FilteredItemGrid', () => {
    it('renders more than 1 filtered items', async () => {
        const { getAllByText, } = render(
            <FilteredItemGrid filter={INITIAL_FILTER} />, {
                store,
            }
        );

        await mockApis();

        await waitFor(() => {
            expect(getAllByText(`${INITIAL_FILTER} homebrew full name`).length).toBeGreaterThanOrEqual(1);
            expect(getAllByText(`${INITIAL_FILTER} homebrew cask full name`).length).toBeGreaterThanOrEqual(1);
        });
    });
});
