import { ReactElement, } from 'react';

import { SectionProps, } from '../Section/Section.types';
import { TopBarProps, } from '../TopBar/TopBar.types';

export interface ScreenProps {
    children? : ReactElement<SectionProps | TopBarProps> | ReactElement<SectionProps | TopBarProps>[];
}
