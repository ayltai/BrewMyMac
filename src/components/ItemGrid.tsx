import { Grid, } from '@mui/material';
import React from 'react';

import type { Item, } from '../types';
import { default as SelectableItem, } from './SelectableItem';

export const ItemGrid = ({
    items,
} : {
    items : Item[],
}) => (
    <Grid
        container
        padding={2}
        spacing={2}>
        {items.map(item => (
            <Grid
                item
                key={`item-${item.source}-${item.id}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}>
                <SelectableItem item={item} />
            </Grid>
        ))}
    </Grid>
);
