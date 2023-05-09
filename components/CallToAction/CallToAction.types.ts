import { ReactNode, } from 'react';

export interface CallToActionProps {
    icon?           : ReactNode,
    children?       : ReactNode,
    onClick?        : () => void,
    [ key : string] : any,
}
