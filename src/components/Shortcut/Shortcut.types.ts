import { ReactNode, } from 'react';

export interface ShortcutProps {
    mode?            : 'desktop' | 'mobile',
    anchor           : string,
    children?        : ReactNode,
    [ key : string ] : any,
}
