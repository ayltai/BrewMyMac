import React from 'react';

import { Item, } from '../models';
import { render, } from '../utils/test';

import { SessionDetail, } from './SessionDetail';

const ITEM : Item = {
    id        : 'dummy_id',
    name      : 'dummy_name',
    source    : 'Tweak',
    parameter : 'dummy_parameter',
};

describe('<SessionDetail />', () => {
    it('renders all child items', () => {
        const { getByText, } = render(
            <SessionDetail
                sessionId='dummy_session_id'
                items={[
                    ITEM,
                ]} />
        );

        expect(getByText('dummy_name')).toBeInTheDocument();
    });
});
