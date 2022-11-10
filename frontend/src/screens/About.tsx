import mixpanel from 'mixpanel-browser';
import { Box, styled, Typography, } from '@mui/material';
import React, { useCallback, useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { ExternalLink, PopUpDialog, } from '../components';

const LineBreakingTypography = styled(Typography)({
    whiteSpace: 'pre-line',
});

export const About = ({
    onClose,
} : {
    onClose? : () => void,
}) => {
    const { t, } = useTranslation();

    const handleLinkedInClick = useCallback(() => {
        mixpanel.track('Referral - LinkedIn');

        window.open(t<string>('url_linkedin'), '_blank');
    }, []);

    useEffect(() => {
        mixpanel.track('Page View - About');
    }, []);

    return (
        <PopUpDialog
            open
            title={t('label_about_title')}
            onClose={onClose}>
            <Box
                width='100%'
                display='flex'
                justifyContent='center'>
                <img
                    width={128}
                    height={128}
                    src={require('../LogoLarge.png')}
                    alt={t('app_name')} />
            </Box>
            <LineBreakingTypography
                gutterBottom
                marginTop={2}
                variant="body1">
                {t('label_about_description')}
            </LineBreakingTypography>
            <ExternalLink
                title={t('action_follow')}
                onClick={handleLinkedInClick} />
        </PopUpDialog>
    );
};
