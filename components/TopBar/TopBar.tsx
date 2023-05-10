'use client';

import { AppBar, Box, Button, Container, Toolbar, useMediaQuery, useScrollTrigger, } from '@mui/material';
import React, { cloneElement, FC, Fragment, ReactElement, } from 'react';

import { default as Branding, } from '../Branding';
import { BrandingProps, } from '../Branding/Branding.types';
import { default as CallToAction, } from '../CallToAction';
import { CallToActionProps, } from '../CallToAction/CallToAction.types';
import { default as LanguageChoice, } from '../LanguageChoice';
import { LanguageChoiceProps, } from '../LanguageChoice/LanguageChoice.types';
import { default as Shortcut, } from '../Shortcut';
import { ShortcutProps, } from '../Shortcut/Shortcut.types';
import { default as ShortcutMenu, } from '../ShortcutMenu';
import { TopBarProps, } from './TopBar.types';

const ElevationScroll = ({
    children,
} : {
    children : ReactElement,
}) => {
    const trigger = useScrollTrigger({
        disableHysteresis : true,
        threshold         : 0,
    });

    return cloneElement(children, {
        elevation : trigger ? 4 : 0,
    });
};

const TopBar : FC<TopBarProps> = ({
    maxWidth = 'lg',
    children,
}) => {
    const desktopMode = useMediaQuery('(min-width:900px)');

    const shortcuts : ReactElement<ShortcutProps>[] = [];

    let branding       : ReactElement<BrandingProps>       | undefined;
    let languageChoice : ReactElement<LanguageChoiceProps> | undefined;
    let callToAction   : ReactElement<CallToActionProps>   | undefined;

    if (children) {
        if (Array.isArray(children)) {
            shortcuts.push(...children.filter(child => child.type === Shortcut) as ReactElement<ShortcutProps>[]);

            branding       = children.find(child => child.type === Branding) as ReactElement<BrandingProps>;
            languageChoice = children.find(child => child.type === LanguageChoice) as ReactElement<LanguageChoiceProps>;
            callToAction   = children.find(child => child.type === CallToAction) as ReactElement<CallToActionProps>;
        } else {
            if (children.type === Shortcut) shortcuts.push(children as ReactElement<ShortcutProps>);
            if (children.type === Branding) branding = children as ReactElement<BrandingProps>;
            if (children.type === LanguageChoice) languageChoice = children as ReactElement<LanguageChoiceProps>;
            if (children.type === CallToAction) callToAction = children as ReactElement<CallToActionProps>;
        }
    }

    const handleClick = () => window.location.href = '/';

    return (
        <Fragment>
            <ElevationScroll>
                <AppBar color='inherit'>
                    <Container maxWidth={maxWidth}>
                        <Toolbar disableGutters>
                            <Box flexGrow={1}>
                                {!desktopMode && shortcuts.length > 0 && (
                                    <ShortcutMenu>
                                        {shortcuts}
                                    </ShortcutMenu>
                                )}
                                {branding && (
                                    <Button
                                        size='large'
                                        color='inherit'
                                        variant='text'
                                        onClick={handleClick}>
                                        {branding}
                                    </Button>
                                )}
                            </Box>
                            <Box flexGrow={0}>
                                {languageChoice}
                                {desktopMode && shortcuts}
                                {callToAction}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </Fragment>
    );
};

export default TopBar;
