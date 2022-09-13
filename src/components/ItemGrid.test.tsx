import React from 'react';

import { Item, } from '../models';
import { render, } from '../utils/test';

import { ItemGrid, } from './ItemGrid';

const ITEM : Item = {
    id        : 'dummy_id',
    name      : 'dummy_name',
    source    : 'Tweak',
    parameter : 'dummy_parameter',
};

describe('<ItemGrid />', () => {
    it('renders correctly', () => expect(render(<ItemGrid items={[
        ITEM,
    ]} />).asFragment()).toMatchSnapshot());
});
