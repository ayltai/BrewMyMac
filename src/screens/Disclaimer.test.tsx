import React from 'react';

import { render, } from '../utils/test';

import { Disclaimer, } from './Disclaimer';

describe('<Disclaimer />', () => {
    it('renders correctly', () => expect(render(<Disclaimer />).asFragment()).toMatchSnapshot());
});
