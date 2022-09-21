import React from 'react';

import { render, } from '../utils/test';

import { Terms, } from './Terms';

describe('<Terms />', () => {
    it('renders correctly', () => expect(render(<Terms />).asFragment()).toMatchSnapshot());
});
