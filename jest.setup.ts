import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('mixpanel-browser', () => ({
    init  : () => {},
    track : () => {},
}));

jest.mock('next-i18next', () => ({
    useTranslation : () => ({
        t    : (key : string, options? : {
            returnObjects? : boolean,
        }) => {
            if (options?.returnObjects) {
                if (key === 'app.filters') return {
                    '@packages' : 'Top packages',
                    '@tweaks'   : 'Top tweaks',
                };
            }

            return key;
        },
        i18n : {
            changeLanguage : () => new Promise(() => {}),
        },
    }),
}));

jest.mock('@sentry/nextjs', () => ({
    init             : () => {},
    captureException : () => {},
}));
