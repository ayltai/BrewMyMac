import { ReactElement, } from 'react';

import { BrandingProps, } from '../Branding/Branding.types';
import { CallToActionProps, } from '../CallToAction/CallToAction.types';
import { LanguageChoiceProps, } from '../LanguageChoice/LanguageChoice.types';
import { ShortcutProps, } from '../Shortcut/Shortcut.types';

export interface TopBarProps {
    maxWidth? : 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    children? : ReactElement<BrandingProps | CallToActionProps | LanguageChoiceProps | ShortcutProps> | ReactElement<BrandingProps | CallToActionProps | LanguageChoiceProps | ShortcutProps>[];
}
