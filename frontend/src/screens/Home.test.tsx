import React from 'react';

import { store, } from '../redux';
import { mockApis, render, waitFor, } from '../utils/test';

import { Home, } from './Home';

describe('<Home />', () => {
    it('renders correctly', async () => {
        const component = render(<Home />, {
            store,
        });

        await mockApis();

        await waitFor(() => {
            expect(component.asFragment()).toMatchSnapshot();
        });
    });
});
