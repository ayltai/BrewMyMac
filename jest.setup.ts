import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('mixpanel-browser', () => ({
    init  : () => {},
    track : () => {},
}));

jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t    : (key : string, options? : {
            returnObjects? : boolean,
        }) => key,
        i18n : {
            changeLanguage : () => new Promise(() => {}),
        },
    }),
}));

jest.mock('@sentry/react', () => ({
    init             : () => {},
    captureException : () => {},
}));
