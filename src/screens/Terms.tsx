import React from 'react';
import { useTranslation, } from 'react-i18next';

import { MarkdownDialog, } from '../components';

export const Terms = ({
    onClose,
} : {
    onClose? : () => void,
}) => {
    const { t, } = useTranslation();

    return (
        <MarkdownDialog
            title={t('label_terms_title')}
            markdownFilePath='/data/terms.md'
            onClose={onClose} />
    );
};
