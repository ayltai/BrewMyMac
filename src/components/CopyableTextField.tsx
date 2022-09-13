import { ContentCopy, } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput, Snackbar, styled, } from '@mui/material';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

const MonospaceInput = styled(OutlinedInput)`
    font-family: monospace;
`;

export const CopyableTextField = ({
    value,
    ...rest
} : {
    value?            : string,
    [ rest : string ] : any,
}) => {
    const [ open, setOpen, ] = useState(false);

    const { t, } = useTranslation();

    const handleCopy = async () => {
        if (value) await navigator.clipboard.writeText(value);

        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <MonospaceInput
                {...rest}
                value={value}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            edge='end'
                            onClick={handleCopy}>
                            <ContentCopy />
                        </IconButton>
                    </InputAdornment>
                } />
            <Snackbar
                open={open}
                anchorOrigin={{
                    horizontal : 'center',
                    vertical   : 'bottom',
                }}
                onClose={handleClose}
                autoHideDuration={2500}
                message={t('label_copy')} />
        </>
    );
};
