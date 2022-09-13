import { Box, Chip, TextField, Typography, } from '@mui/material';
import { useGA4React, } from 'ga-4-react';
import React, { useEffect, } from 'react';
import { useTranslation, } from 'react-i18next';

import { PopUpDialog, } from '../components';
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
    const ga = useGA4React();

    const { t, } = useTranslation();

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => onChange && onChange(event.target.value);

    useEffect(() => {
        if (ga) ga.pageview('/itemDetail');
    }, [ ga, ]);

    return (
        <PopUpDialog
            open
            title={item.name}
            onClose={onClose}>
            <Typography
                gutterBottom
                color='text.secondary'
                variant='body2'>
                {item.description}
            </Typography>
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
            <Chip
                size='small'
                label={item.source} />
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
