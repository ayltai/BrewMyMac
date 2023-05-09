const { withSentryConfig, } = require('@sentry/nextjs');
const { i18n, } = require('./next-i18next.config.js');

const nextConfig = {
    reactStrictMode   : true,
    swcMinify         : true,
    modularizeImports : {
        '@mui/icons-material' : {
            transform : '@mui/icons-material/{{member}}',
        },
        '@mui/material'       : {
            transform : '@mui/material/{{member}}',
        },
    },
    i18n,
    sentry            : {},
};

const sentryWebpackPluginOptions = {
    org     : 'alantai',
    project : 'brewmymac',
    silent  : true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
