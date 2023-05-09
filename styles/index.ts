import { Components, PaletteOptions, Theme, } from '@mui/material/styles';
import { Roboto, } from 'next/font/google';

const roboto = Roboto({
    display : 'swap',
    subsets : [
        'latin',
    ],
    weight  : [
        '400',
        '500',
    ],
});

export const palette : PaletteOptions = {
    primary   : {
        main : '#40c4ff',
    },
    secondary : {
        main : '#ffab40',
    },
};

export const components : Components<Omit<Theme, 'components'>> = {
    MuiButton     : {
        styleOverrides : {
            root : {
                paddingLeft   : 24,
                paddingRight  : 24,
                borderRadius  : '2rem',
                fontWeight    : 'bold',
                textTransform : 'none',
            },
        },
    },
    MuiDialog     : {
        styleOverrides : {
            paper : {
                borderRadius : '0.8rem',
            },
        },
    },
};

export const typography = {
    fontFamily : roboto.style.fontFamily,
};
