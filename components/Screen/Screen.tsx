import { Box, } from '@mui/material';
import React, { FC, ReactElement, } from 'react';

import { ScreenProps, } from './Screen.types';
import { default as Section, } from '../Section';
import { SectionProps, } from '../Section/Section.types';
import { default as TopBar, } from '../TopBar';
import { TopBarProps, } from '../TopBar/TopBar.types';

const Screen : FC<ScreenProps> = ({
    children,
}) => {
    const sections : ReactElement<SectionProps>[] = [];

    let topBar : ReactElement<TopBarProps> | undefined;

    if (children) {
        if (Array.isArray(children)) {
            sections.push(...children.filter(child => child.type === Section) as ReactElement<SectionProps>[]);

            topBar = children.find(child => child.type === TopBar) as ReactElement<TopBarProps>;
        } else {
            if (children.type === Section) sections.push(children as ReactElement<SectionProps>);
            if (children.type === TopBar) topBar = children as ReactElement<TopBarProps>;
        }
    }

    return (
        <Box width='100%'>
            {topBar}
            {sections}
        </Box>
    );
};

export default Screen;
