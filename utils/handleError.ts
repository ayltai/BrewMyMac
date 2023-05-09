import * as Sentry from '@sentry/nextjs';

export const handleError = (error : any) => {
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
    } else {
        console.error(error);
    }
};
