import React from 'react';
import { useTranslation, } from 'react-i18next';

import { MarkdownDialog, } from '../components';

export const Disclaimer = ({
    onClose,
} : {
    onClose? : () => void,
}) => {
    const { t, } = useTranslation();

    return (
        <MarkdownDialog
            title={t('label_disclaimer_title')}
            markdownFilePath='/data/disclaimer.md'
            onClose={onClose} />
    );
};
