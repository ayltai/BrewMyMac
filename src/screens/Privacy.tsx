import React from 'react';
import { useTranslation, } from 'react-i18next';

import { MarkdownDialog, } from '../components';

export const Privacy = ({
    onClose,
} : {
    onClose? : () => void,
}) => {
    const { t, } = useTranslation();

    return (
        <MarkdownDialog
            title={t('label_privacy_title')}
            markdownFilePath='/data/privacy.md'
            onClose={onClose} />
    );
};
