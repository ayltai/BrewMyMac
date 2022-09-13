import { Typography, } from '@mui/material';
import { useGA4React, } from 'ga-4-react';
import React, { useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { CopyableTextField, ItemList, PopUpDialog, } from '../components';
import type { Item, Session, } from '../models';

export const SessionDetail = ({
    session,
    items,
    onClose,
} : {
    session  : Session,
    items    : Item[],
    onClose? : () => void,
}) => {
    const ga = useGA4React();

    const { t, } = useTranslation();

    useEffect(() => {
        if (ga) ga.pageview('/sessionDetail');
    }, [ ga, ]);

    return (
        <PopUpDialog
            open
            title={t('label_session')}
            onClose={onClose}>
            <Typography gutterBottom>
                {t('label_selected')}
            </Typography>
            <ItemList items={items} />
            <Typography
                marginTop={2}
                gutterBottom>
                {t('label_instruction')}
            </Typography>
            <CopyableTextField
                fullWidth
                value={`/bin/bash -c "$(curl -fsSL https://x8ki-letl-twmt.n7.xano.io/api:bt-93slL/sessions/${session.sessionId} | jq -r '.script')"`} />
        </PopUpDialog>
    );
};
