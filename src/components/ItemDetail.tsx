'use client';

import { Box, Chip, TextField, Typography, } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import { useTranslation, } from 'next-i18next';
import React, { useCallback, } from 'react';

import { ExternalLink, } from './ExternalLink';
import { PopUpDialog, } from './PopUpDialog';

import type { Item, } from '../types';

export const ItemDetail = ({
    item,
    onClose,
    onChange,
} : {
    item      : Item,
    onClose?  : () => void,
    onChange? : (value? : string) => void,
}) => {
    const { t, } = useTranslation();

    const handleChange = useCallback((event : React.ChangeEvent<HTMLInputElement>) => onChange && onChange(event.target.value), [ onChange, ]);

    return (
        <PopUpDialog
            open
            title={item.name}
            onClose={onClose}>
            {item.infoUrl && (
                <ExternalLink
                    title={t('item.homepage')}
                    href={item.infoUrl} />
            )}
            {item.imageUrl && (
                <Box textAlign='center'>
                    <Image
                        src={item.imageUrl}
                        alt={item.name} />
                </Box>
            )}
            {item.description && (
                <Markdown>
                    {item.description}
                </Markdown>
            )}
            {item.author && (
                <Typography
                    gutterBottom
                    color='text.secondary'
                    variant='subtitle2'>
                    {t('item.author', {
                        author : item.author,
                    })}
                </Typography>
            )}
            <Box marginY={1}>
                <Chip
                    size='small'
                    label={item.source} />
            </Box>
            {item.source === 'Tweak' && item.parameter && (
                <Box marginTop={4}>
                    <TextField
                        autoFocus
                        label={t('item.parameter')}
                        variant='outlined'
                        value={item.parameter}
                        onChange={handleChange} />
                </Box>
            )}
        </PopUpDialog>
    );
};
