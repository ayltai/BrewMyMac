import React from 'react';

import { store, } from '../redux';
import { mockApis, render, waitFor, } from '../utils/test';

import { FilteredItemGrid, } from './FilteredItemGrid';

const INITIAL_FILTER = 'firefox';

describe('<FilteredItemGrid />', () => {
    it('renders filtered items correctly', async () => {
        const { getAllByText, } = render(
            <FilteredItemGrid filter={INITIAL_FILTER} />, {
                store,
            }
        );

        await mockApis();

        await waitFor(() => {
            expect(getAllByText(`${INITIAL_FILTER} homebrew full name`).length).toBeGreaterThanOrEqual(1);
            expect(getAllByText(`${INITIAL_FILTER} homebrew cask full name`).length).toBeGreaterThanOrEqual(1);
            expect(getAllByText(`${INITIAL_FILTER} tweak name`).length).toBeGreaterThanOrEqual(1);
            expect(getAllByText(`${INITIAL_FILTER} app store name`).length).toBeGreaterThanOrEqual(1);
        });
    });
});
