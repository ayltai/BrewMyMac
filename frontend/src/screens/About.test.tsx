import React from 'react';

import { render, } from '../utils/test';

import { About, } from './About';

describe('<About />', () => {
    it('renders correctly', () => expect(render(<About />).asFragment()).toMatchSnapshot());
});
