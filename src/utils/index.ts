import { GA4React, } from 'ga-4-react';

export const handleError = (error : any) => {
    console.error(error);

    if (process.env.REACT_APP_GA_TAG) new GA4React(process.env.REACT_APP_GA_TAG).event('Error', JSON.stringify(error), 'Error');
};
