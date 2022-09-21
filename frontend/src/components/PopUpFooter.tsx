import { Box, Link, styled, } from '@mui/material';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { About, Disclaimer, Privacy, Terms, } from '../screens';

import { Footer, } from './Footer';

const ClickableLink = styled(Link)`
    cursor : pointer;
`;

export const PopUpFooter = () => {
    const [ showTerms,      setShowTerms,      ] = useState<boolean>(false);
    const [ showPrivacy,    setShowPrivacy,    ] = useState<boolean>(false);
    const [ showDisclaimer, setShowDisclaimer, ] = useState<boolean>(false);
    const [ showAbout,      setShowAbout,      ] = useState<boolean>(false);

    const { t, } = useTranslation();

    const handleShowTerms = () => setShowTerms(true);

    const handleShowPrivacy = () => setShowPrivacy(true);

    const handleShowDisclaimer = () => setShowDisclaimer(true);

    const handleShowAbout = () => setShowAbout(true);

    const handleCloseTerms = () => setShowTerms(false);

    const handleClosePrivacy = () => setShowPrivacy(false);

    const handleCloseDisclaimer = () => setShowDisclaimer(false);

    const handleCloseAbout = () => setShowAbout(false);

    return (
        <>
            <Footer>
                <Box margin={2}>
                    <ClickableLink onClick={handleShowTerms}>{t('label_terms_title')}</ClickableLink>
                </Box>
                <Box margin={2}>
                    <ClickableLink onClick={handleShowPrivacy}>{t('label_privacy_title')}</ClickableLink>
                </Box>
                <Box margin={2}>
                    <ClickableLink onClick={handleShowDisclaimer}>{t('label_disclaimer_title')}</ClickableLink>
                </Box>
                <Box margin={2}>
                    <ClickableLink onClick={handleShowAbout}>{t('label_about_title')}</ClickableLink>
                </Box>
            </Footer>
            {showTerms && <Terms onClose={handleCloseTerms} />}
            {showPrivacy && <Privacy onClose={handleClosePrivacy} />}
            {showDisclaimer && <Disclaimer onClose={handleCloseDisclaimer} />}
            {showAbout && <About onClose={handleCloseAbout} />}
        </>
    );
};
