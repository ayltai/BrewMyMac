import { Box, Container, Stack, useMediaQuery, } from '@mui/material';
import React, { FC, Fragment, ReactElement, } from 'react';

import { SectionProps, } from './Section.types';
import { default as SectionName, } from '../SectionName';
import { SectionNameProps } from '../SectionName/SectionName.types';
import { default as SectionTitle, } from '../SectionTitle';
import { SectionTitleProps } from '../SectionTitle/SectionTitle.types';
import { default as SectionDescription, } from '../SectionDescription';
import { SectionDescriptionProps } from '../SectionDescription/SectionDescription.types';
import { default as SectionContent, } from '../SectionContent';
import { SectionContentProps } from '../SectionContent/SectionContent.types';
import { default as SectionForeground, } from '../SectionForeground';
import { SectionForegroundProps } from '../SectionForeground/SectionForeground.types';

const Section : FC<SectionProps> = ({
    anchor,
    background = 'white',
    maxWidth   = 'lg',
    layout     = 'center',
    children,
}) => {
    const desktopMode = useMediaQuery('(min-width: 900px)');

    let name        : ReactElement<SectionNameProps>        | undefined;
    let title       : ReactElement<SectionTitleProps>       | undefined;
    let description : ReactElement<SectionDescriptionProps> | undefined;
    let content     : ReactElement<SectionContentProps>     | undefined;
    let foreground  : ReactElement<SectionForegroundProps>  | undefined;

    if (children) {
        if (Array.isArray(children)) {
            name        = children.find(child => child.type === SectionName) as ReactElement<SectionNameProps>;
            title       = children.find(child => child.type === SectionTitle) as ReactElement<SectionTitleProps>;
            description = children.find(child => child.type === SectionDescription) as ReactElement<SectionDescriptionProps>;
            content     = children.find(child => child.type === SectionContent) as ReactElement<SectionContentProps>;
            foreground  = children.find(child => child.type === SectionForeground) as ReactElement<SectionForegroundProps>;
        } else {
            if (children.type === SectionName) name = children as ReactElement<SectionNameProps>;
            if (children.type === SectionTitle) title = children as ReactElement<SectionTitleProps>;
            if (children.type === SectionDescription) description = children as ReactElement<SectionDescriptionProps>;
            if (children.type === SectionContent) content = children as ReactElement<SectionContentProps>;
            if (children.type === SectionForeground) foreground = children as ReactElement<SectionForegroundProps>;
        }
    }

    const centerLayout = (
        <Stack
            direction='column'
            textAlign='center'>
            {name}
            {title}
            {description}
            {content}
            {foreground}
        </Stack>
    );

    const contentPart = (
        <Stack
            width='50%'
            direction='column'>
            {name}
            {title}
            {description}
            {content}
        </Stack>
    );

    const foregroundPart = (
        <Stack width='50%'>
            {foreground}
        </Stack>
    );

    const leftLayout = (
        <Stack direction='row'>
            {contentPart}
            {foregroundPart}
        </Stack>
    );

    const rightLayout = (
        <Stack direction='row'>
            {foregroundPart}
            {contentPart}
        </Stack>
    );

    return (
        <Fragment>
            {anchor && (
                <a id={`#${anchor}`} />
            )}
            <Box
                sx={{
                    background,
                }}
                width='100%'>
                <Container maxWidth={maxWidth}>
                    {(layout === 'center' || !desktopMode) && centerLayout}
                    {desktopMode && layout === 'left' && leftLayout}
                    {desktopMode && layout === 'right' && rightLayout}
                </Container>
            </Box>
        </Fragment>
    );
};

export default Section;

