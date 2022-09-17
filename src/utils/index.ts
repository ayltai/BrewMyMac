import Bugsnag from '@bugsnag/js';
import * as Sentry from '@sentry/react';

export const handleError = (error : any) => {
    if (process.env.NODE_ENV === 'production') {
        Bugsnag.notify(error);
        Sentry.captureException(error);
    } else {
        console.error(error);
    }
};
