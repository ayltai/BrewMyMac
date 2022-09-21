import mixpanel from 'mixpanel-browser';
import { NotificationImportant, } from '@mui/icons-material';
import { Box, Link, Typography, } from '@mui/material';
import React, { useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { CopyableTextField, ItemList, PopUpDialog, } from '../components';
import { BREWMYMAC_API_ENDPOINT, } from '../constants';
import type { Item, } from '../models';

export const SessionDetail = ({
    sessionId,
    items,
    onClose,
} : {
    sessionId : string,
    items     : Item[],
    onClose?  : () => void,
}) => {
    const { t, } = useTranslation();

    useEffect(() => {
        mixpanel.track('Page View', {
            name : 'Session Detail',
        });
    }, []);

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
                value={`/bin/bash -c "$(curl -fsSL ${BREWMYMAC_API_ENDPOINT}/api/sessions?sessionId=${sessionId}"`} />
        </PopUpDialog>
    );
};
