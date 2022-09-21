import React from 'react';

import { render, } from '../utils/test';

import { Privacy, } from './Privacy';

describe('<Privacy />', () => {
    it('renders correctly', () => expect(render(<Privacy />).asFragment()).toMatchSnapshot());
});
