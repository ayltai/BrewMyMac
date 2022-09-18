import mixpanel from 'mixpanel-browser';
import { Box, Link, styled, Typography, } from '@mui/material';
import React, { useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { PopUpDialog, } from '../components';

const ClickableLink = styled(Link)`
    cursor : pointer;
`;

const LineBreakingTypography = styled(Typography)({
    whiteSpace: 'pre-line',
});

export const About = ({
    onClose,
} : {
    onClose? : () => void,
}) => {
    const { t, } = useTranslation();

    const handleLinkedInClick = () => {
        mixpanel.track('Referral', {
            name : 'LinkedIn',
        });

        window.open(t('url_linkedin'), '_blank');
    };

    useEffect(() => {
        mixpanel.track('Page View', {
            name : 'About',
        });
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
                    src={require('../LogoLarge.png')} />
            </Box>
            <LineBreakingTypography
                gutterBottom
                marginTop={2}
                variant="body1">
                {t('label_about_description')}
            </LineBreakingTypography>
            <ClickableLink onClick={handleLinkedInClick}>
                {t('action_follow')}
            </ClickableLink>
        </PopUpDialog>
    );
};
