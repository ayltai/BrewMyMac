import { Close, } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, } from '@mui/material';
import React, { ReactNode, } from 'react';
import { useTranslation, } from 'react-i18next';

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
                        title={t('action_close')}
                        onClick={onClose}>
                        <Close />
                    </CloseButton>
                )}
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={onClose}>
                    {t('action_close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
