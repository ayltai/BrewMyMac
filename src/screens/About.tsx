import { Box, Link, styled, Typography, } from '@mui/material';
import { useGA4React, } from 'ga-4-react';
import React, { useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { PopUpDialog, } from '../components';

const LineBreakingTypography = styled(Typography)({
    whiteSpace: 'pre-line',
});

export const About = ({
    onClose,
} : {
    onClose? : () => void,
}) => {
    const ga = useGA4React();

    const { t, } = useTranslation();

    useEffect(() => {
        if (ga) ga.pageview('/about');
    }, [ ga, ]);

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
            <Link
                href={t('url_linkedin')}
                target='_blank'>
                {t('action_follow')}
            </Link>
        </PopUpDialog>
    );
};
