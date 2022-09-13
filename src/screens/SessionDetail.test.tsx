import React from 'react';

import { Item, Session, } from '../models';
import { render, } from '../utils/test';

import { SessionDetail, } from './SessionDetail';

const ITEM : Item = {
    id        : 'dummy_id',
    name      : 'dummy_name',
    source    : 'Tweak',
    parameter : 'dummy_parameter',
};

const SESSION : Session = {
    sessionId : 'dummy session id',
    script    : 'dummy script',
};

describe('<SessionDetail />', () => {
    it('renders all child items', () => {
        const { getByText, } = render(
            <SessionDetail
                session={SESSION}
                items={[
                    ITEM,
                ]} />
        );

        expect(getByText('dummy_name')).toBeInTheDocument();
    });
});
