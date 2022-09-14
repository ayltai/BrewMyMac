import { NotificationImportant, } from '@mui/icons-material';
import { Box, Link, Typography, } from '@mui/material';
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
    const ga = useGA4React(process.env.REACT_APP_GA_TAG);

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
            {items.some(item => item.source === 'App Store') && (
                <Box
                    marginY={2}
                    display='flex'
                    alignItems='center'>
                    <NotificationImportant />
                    <Link
                        marginLeft={1}
                        href='https://support.apple.com/guide/app-store/fir6253293d/mac'
                        target='_blank'>
                        {t('label_app_store')}
                    </Link>
                </Box>
            )}
            {items.some(item => item.source === 'Tweak') && (
                <Box
                    marginY={2}
                    display='flex'
                    alignItems='center'>
                    <NotificationImportant />
                    <Link
                        marginLeft={1}
                        href='https://developer.apple.com/documentation/security/disabling_and_enabling_system_integrity_protection'
                        target='_blank'>
                        {t('label_tweaks')}
                    </Link>
                </Box>
            )}
            <Typography
                marginTop={2}
                gutterBottom>
                {t('label_instruction')}
            </Typography>
            <CopyableTextField
                fullWidth
                value={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" && eval "$(/opt/homebrew/bin/brew shellenv)" && brew install jq && /bin/bash -c "$(curl -fsSL https://x8ki-letl-twmt.n7.xano.io/api:bt-93slL/sessions/${session.sessionId} | jq -r '.script')"`} />
        </PopUpDialog>
    );
};
