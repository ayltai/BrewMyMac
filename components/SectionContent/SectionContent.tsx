import React, { FC, Fragment, } from 'react';

import { SectionContentProps, } from './SectionContent.types';

const SectionContent : FC<SectionContentProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default SectionContent;
