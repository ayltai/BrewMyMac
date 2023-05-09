import React, { FC, Fragment, } from 'react';

import { BrandingProps, } from './Branding.types';

const Branding : FC<BrandingProps> = ({
    children,
}) => (
    <Fragment>
        {children}
    </Fragment>
);

export default Branding;
