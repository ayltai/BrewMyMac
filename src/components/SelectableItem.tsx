import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, styled, Typography, } from '@mui/material';
import { useGA4React, } from 'ga-4-react';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { useAppDispatch, useAppSelector, } from '../hooks';
import type { Item, } from '../models';
import { addItem, removeItem, setItems, } from '../redux';
import { ItemDetail, } from '../screens';

const FixedWidthCard = styled(Card)(({ theme, }) => ({
    width       : '100%',
    borderColor : theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
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

export const SelectableItem = ({
    item,
} : {
    item : Item,
}) => {
    const ga       = useGA4React(process.env.REACT_APP_GA_TAG);
    const dispatch = useAppDispatch();
    const session  = useAppSelector(state => state.session);

    const [ open, setOpen, ] = useState(false);

    const { t, } = useTranslation();

    const selectedItem = session.items.find((i : Item) => i.id === item.id && i.source === item.source);

    const handleClick = () => {
        if (selectedItem) {
            dispatch(removeItem(item));
        } else {
            if (ga) ga.event(item.source, item.id, 'Selection');

            dispatch(addItem(item));
        }
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChange = (value? : string) => {
        const newItem : Item = {
            ...item,
            parameter : value,
        };

        dispatch(setItems([
            ...session.items.map((i : Item) => i.id === item.id && i.source === item.source ? newItem : i),
        ]));
    };

    return (
        <>
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
                                    {t('label_author', {
                                        author : (selectedItem || item).author,
                                    })}
                                </SingleLineTypography>
                            )}
                        </Box>
                        <TruncatedTypography
                            height={43}
                            color='text.secondary'
                            variant='body2'>
                            {(selectedItem || item).description}
                        </TruncatedTypography>
                        <Chip
                            size='small'
                            label={(selectedItem || item).source} />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size='small'
                        color='primary'
                        onClick={handleOpen}>
                        {(selectedItem || item).source === 'Tweak' && t('action_customize')}
                        {(selectedItem || item).source !== 'Tweak' && t('action_learn_more')}
                    </Button>
                </CardActions>
            </FixedWidthCard>
            {open && (
                <ItemDetail
                    item={selectedItem || item}
                    onClose={handleClose}
                    onChange={handleChange} />
            )}
        </>
    );
};
