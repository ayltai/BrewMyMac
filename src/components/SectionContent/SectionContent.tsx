import React, { FC, Fragment, } from 'react';

import type { SectionContentProps, } from './SectionContent.types';

const SectionContent : FC<SectionContentProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default SectionContent;
