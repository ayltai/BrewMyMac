import React from 'react';

import { ItemGrid, } from '../../src/components';
import { render, } from '../../src/utils/test-utils';

import type { Item, } from '../../src/types';

const item : Item = {
    id          : '1',
    name        : 'Name 1',
    description : 'Description 1',
    source      : 'Tweak',
    parameter   : 'Value 1'
};

describe('ItemGrid', () => {
    it('renders correctly', () => expect(render(<ItemGrid items={[
        item,
    ]} />)).toMatchSnapshot());
});
