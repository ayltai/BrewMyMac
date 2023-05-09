import * as Sentry from '@sentry/nextjs';

if (process.env.SENTRY_DSN) Sentry.init({
    dsn                      : process.env.SENTRY_DSN,
    integrations             : [
        new Sentry.Replay(),
    ],
    replaysSessionSampleRate : 0.1,
    replaysOnErrorSampleRate : 1.0,
    tracesSampleRate         : 1.0,
});
