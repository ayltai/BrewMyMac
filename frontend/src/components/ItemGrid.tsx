import { Grid, } from '@mui/material';
import React from 'react';

import type { Item, } from '../models';

import { SelectableItem, } from './SelectableItem';

export const ItemGrid = ({
    items,
} : {
    items : Item[],
}) => (
    <Grid
        container
        padding={2}
        spacing={2}>
        {items.map((item : Item, index : number) => (
            <Grid
                key={`${item.id}-${item.source}-${index}`}
                item
                xs={6}
                sm={4}
                lg={3}>
                <SelectableItem item={item} />
            </Grid>
        ))}
    </Grid>
);
