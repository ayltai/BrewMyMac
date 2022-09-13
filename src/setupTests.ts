import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t : (key : string, options? : object) => `${key}${options ? JSON.stringify(options) : ''}`,
    }),
}));

jest.mock('ga-4-react', () => ({
    useGA4React : () => ({
        getGA4React : () => {},
        event       : () => {},
        pageview    : () => {},
    }),
}));
