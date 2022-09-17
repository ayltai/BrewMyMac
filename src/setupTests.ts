import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('@bugsnag/js', () => ({
    start  : () => {},
    notify : () => {},
}));

jest.mock('mixpanel-browser', () => ({
    init        : () => {},
    track       : () => {},
    track_links : () => {},
}));

jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t : (key : string, options? : object) => `${key}${options ? JSON.stringify(options) : ''}`,
    }),
}));

jest.mock('@sentry/react', () => ({
    init             : () => {},
    captureException : () => {},
}));
