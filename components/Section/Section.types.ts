import { ReactElement } from 'react';

import { SectionDescriptionProps, } from '../SectionDescription/SectionDescription.types';
import { SectionNameProps, } from '../SectionName/SectionName.types';
import { SectionTitleProps, } from '../SectionTitle/SectionTitle.types';

export interface SectionProps {
    anchor?     : string,
    background? : string,
    maxWidth?   : 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    layout?     : 'center' | 'left' | 'right',
    children?   : ReactElement<SectionDescriptionProps | SectionNameProps | SectionTitleProps> | ReactElement<SectionDescriptionProps | SectionNameProps | SectionTitleProps>[],
}
