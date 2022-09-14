import { Box, List, ListItem, ListItemText, ListSubheader, styled, } from '@mui/material';
import React from 'react';

import { Item, } from '../models';

const SECTIONS = [
    'Homebrew',
    'Homebrew-Cask',
    'App Store',
    'Tweak',
];

const StickyList = styled(List)(({ theme, }) => ({
    width           : '100%',
    position        : 'relative',
    backgroundColor : theme.palette.background.paper,
    overflow        : 'auto',
    maxHeight       : 400,
    '& ul'          : {
        padding : 0,
    },
}));

export const ItemList = ({
    items,
} : {
    items : Item[],
}) => {
    const sections : Item[][] = [];
    SECTIONS.forEach(section => sections.push(items.filter(item => item.source === section)));

    return (
        <Box border={1}>
            <StickyList
                dense
                subheader={<li />}>
                {SECTIONS.filter(section => sections[SECTIONS.indexOf(section)].length > 0).map(section => (
                    <li key={section}>
                        <ul>
                            <ListSubheader>{section}</ListSubheader>
                            {sections[SECTIONS.indexOf(section)].map(item => (
                                <ListItem key={item.id}>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </StickyList>
        </Box>
    );
};
