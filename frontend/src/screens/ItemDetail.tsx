import mixpanel from 'mixpanel-browser';
import { Box, Chip, TextField, Typography, } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { ExternalLink, PopUpDialog, } from '../components';
import type { Item, } from '../models';

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

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => onChange && onChange(event.target.value);

    useEffect(() => {
        mixpanel.track('Page View - Item Detail');
    }, []);

    return (
        <PopUpDialog
            open
            title={item.name}
            onClose={onClose}>
            {item.infoUrl && (
                <ExternalLink
                    title={t('label_website')}
                    href={item.infoUrl} />
            )}
            {item.imageUrl && (
                <Box textAlign='center'>
                    <img
                        src={item.imageUrl}
                        alt={item.name} />
                </Box>
            )}
            {item.description && <Markdown>{item.description}</Markdown>}
            {item.author && (
                <Typography
                    gutterBottom
                    color='text.secondary'
                    variant='subtitle2'>
                    {t('label_author', {
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
                        label={t('label_parameter')}
                        variant='outlined'
                        value={item.parameter}
                        onChange={handleChange} />
                </Box>
            )}
        </PopUpDialog>
    );
};
