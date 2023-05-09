import React, { FC, Fragment, } from 'react';

import { SectionForegroundProps, } from './SectionForeground.types';

const SectionForeground : FC<SectionForegroundProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default SectionForeground;
