import React from 'react';
import ReactDOM from 'react-dom/client';

import { App, } from './App';
import { apply, } from './i18n';
import en from './i18n/en.json';
import { handleError, } from './utils';
import './index.css';

apply({
    language         : 'en',
    fallbackLanguage : 'en',
    resources        : {
        en : {
            translation : en,
        },
    },
}).then(() => ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)).catch(handleError);
