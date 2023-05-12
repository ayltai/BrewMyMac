import { serverSideTranslations, } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

export default async function getServerSideProps({
    locale,
} : {
    locale : string,
}) {
    return {
        props : {
            ...(await serverSideTranslations(locale, [
                'common',
            ], nextI18NextConfig)),
        },
    };
}
