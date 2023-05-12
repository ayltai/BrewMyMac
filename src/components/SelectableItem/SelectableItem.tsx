'use client';

import { Info as InfoIcon, Tune as TuneIcon, } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Typography, } from '@mui/material';
import { styled, } from '@mui/material/styles';
import { useTranslation, } from 'next-i18next';
import React, { FC, Fragment, useState, } from 'react';

import { useAppDispatch, useAppSelector, } from '../../hooks';
import { addItem, removeItem, setItems, ShoppingCartState, } from '../../states';
import { Item, } from '../../types';
import { ItemDetail, } from '../ItemDetail';

import type { SelectableItemProps, } from './SelectableItem.types';

const FixedWidthCard = styled(Card)(({ theme, }) => ({
    width       : '100%',
    borderColor : theme.palette.primary.light,
}));

const SingleLineTypography = styled(Typography)({
    display         : '-webkit-box',
    overflow        : 'hidden',
    textOverflow    : 'ellipsis',
    WebkitBoxOrient : 'vertical',
    WebkitLineClamp : 1,
});

const TruncatedTypography = styled(Typography)({
    display         : '-webkit-box',
    overflow        : 'hidden',
    textOverflow    : 'ellipsis',
    WebkitBoxOrient : 'vertical',
    WebkitLineClamp : 2,
});

const SelectableItem : FC<SelectableItemProps> = ({
    item,
}) => {
    const [ open, setOpen, ] = useState(false);

    const dispatch                         = useAppDispatch();
    const shoppingCart : ShoppingCartState = useAppSelector(state => state.shoppingCart);

    const { t, } = useTranslation();

    const selectedItem = shoppingCart.items.find(i => i.id === item.id && i.source === item.source);

    let actionIcon;

    if ((selectedItem || item).source === 'Tweak') actionIcon = <TuneIcon />;
    if ((selectedItem || item).source !== 'Tweak') actionIcon = <InfoIcon />;

    const handleClick = () => {
        if (selectedItem) {
            dispatch(removeItem(item));
        } else {
            dispatch(addItem(item));
        }
    };

    const handleAction = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChange = (value? : string) => {
        const newItem : Item = {
            ...item,
            parameter : value,
        };

        dispatch(setItems([
            ...shoppingCart.items.map(i => i.id === item.id && i.source === item.source ? newItem : i),
        ]))
    };

    return (
        <Fragment>
            <FixedWidthCard variant={selectedItem ? 'outlined' : 'elevation'}>
                <CardActionArea
                    role='gridcell'
                    onClick={handleClick}>
                    <CardContent>
                        <SingleLineTypography
                            height={32}
                            variant='h6'>
                            {(selectedItem || item).name}
                        </SingleLineTypography>
                        <Box height={24}>
                            {(selectedItem || item).author && (
                                <SingleLineTypography
                                    color='text.secondary'
                                    variant='subtitle2'>
                                    {t('item.author', {
                                        author : (selectedItem || item).author,
                                    })}
                                </SingleLineTypography>
                            )}
                        </Box>
                        <TruncatedTypography
                            height={48}
                            color='text.secondary'
                            variant='body2'>
                            {(selectedItem || item).description}
                        </TruncatedTypography>
                        <Box marginTop={1}>
                            <Chip
                                size='small'
                                label={(selectedItem || item).source} />
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size='small'
                        color='primary'
                        startIcon={actionIcon}
                        onClick={handleAction}>
                        {(selectedItem || item).source === 'Tweak' && t('action.customize')}
                        {(selectedItem || item).source !== 'Tweak' && t('action.learn-more')}
                    </Button>
                </CardActions>
            </FixedWidthCard>
            {open && (
                <ItemDetail
                    item={selectedItem || item}
                    onClose={handleClose}
                    onChange={handleChange} />
            )}
        </Fragment>
    );
};

export default SelectableItem;
