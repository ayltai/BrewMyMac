import React from 'react';

import { default as SearchBox, } from '../../src/components/SearchBox';
import { fireEvent, render, waitFor, } from '../../src/utils/test-utils';

describe('SearchBox', () => {
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
