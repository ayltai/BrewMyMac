import React from 'react';

import { render, } from '../utils/test';

import { Loading, } from './Loading';

describe('<ExemptionRecord />', () => {
    it('renders correctly', () => expect(render(<Loading />).asFragment()).toMatchSnapshot());
});
