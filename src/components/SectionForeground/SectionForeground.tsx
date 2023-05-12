import React, { FC, Fragment, } from 'react';

import type { SectionForegroundProps, } from './SectionForeground.types';

const SectionForeground : FC<SectionForegroundProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default SectionForeground;
