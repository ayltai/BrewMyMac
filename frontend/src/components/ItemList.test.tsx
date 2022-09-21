import React from 'react';

import { Item, } from '../models';
import { render, } from '../utils/test';

import { ItemList, } from './ItemList';

const ITEM : Item = {
    id        : 'dummy_id',
    name      : 'dummy_name',
    source    : 'Tweak',
    parameter : 'dummy_parameter',
};

describe('<ItemList />', () => {
    it('renders correctly', () => expect(render(<ItemList items={[
        ITEM,
    ]} />).asFragment()).toMatchSnapshot());
});
