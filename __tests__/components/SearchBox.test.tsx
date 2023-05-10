import React from 'react';

import { fireEvent, render, waitFor, } from '../../utils/test-utils';

import { default as SearchBox, } from '../../components/SearchBox';

describe('<SearchBox />', () => {
    it('triggers onSearch when the input text has changed', async () => {
        const handleSearch = jest.fn();

        const { getByRole, } = render(<SearchBox onSearch={handleSearch} />);

        fireEvent.change(getByRole('textbox'), {
            target : {
                value : 'dummy',
            },
        });

        await waitFor(() => {
            expect(handleSearch).toBeCalledWith('dummy');
        });
    });
});
