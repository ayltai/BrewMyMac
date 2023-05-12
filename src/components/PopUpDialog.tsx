'use client';

import { Close as CloseIcon, } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, } from '@mui/material';
import { styled, } from '@mui/material/styles';
import { useTranslation, } from 'next-i18next';
import React, { ReactNode, } from 'react';

const CloseButton = styled(IconButton)(({ theme, }) => ({
    position : 'absolute',
    right    : theme.spacing(1),
    top      : theme.spacing(1),
    color    : theme.palette.grey[500],
}));

export const PopUpDialog = ({
    open = false,
    title,
    children,
    onClose,
} : {
    open?     : boolean,
    title     : string,
    children? : ReactNode,
    onClose?  : () => void,
}) => {
    const { t, } = useTranslation();

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={onClose}>
            <DialogTitle>
                {title}
                {onClose && (
                    <CloseButton
                        aria-label={t<string>('action.close')}
                        title={t<string>('action.close')}
                        onClick={onClose}>
                        <CloseIcon />
                    </CloseButton>
                )}
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    aria-label={t<string>('action.close')}
                    onClick={onClose}>
                    {t('action.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
