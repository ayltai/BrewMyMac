import React from 'react';

import { render, } from '../utils/test';

import { ActionBar, } from './ActionBar';

describe('<ActionBar />', () => {
    it('renders correctly', () => expect(render(<ActionBar />).asFragment()).toMatchSnapshot());
});
