import { ReactElement, } from 'react';

import { ShortcutProps, } from '../Shortcut/Shortcut.types';

export interface ShortcutMenuProps {
    children?        : ReactElement<ShortcutProps> | ReactElement<ShortcutProps>[],
    [ key : string ] : any,
}
