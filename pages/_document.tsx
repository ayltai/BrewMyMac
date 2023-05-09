import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentProps, } from 'next/document';
import { AppType, } from 'next/app';
import React, { ComponentProps, ComponentType, } from 'react';

import { CustomAppProps, } from './_app';
import { createEmotionCache, } from '../utils';

interface CustomDocumentProps extends DocumentProps {
    emotionStyleTags : JSX.Element[],
}

const CustomDocument = ({
    emotionStyleTags,
} : CustomDocumentProps) => (
    <Html lang='en'>
        <Head>
            <meta name='emotion-insertion-point' content='' />
            {emotionStyleTags}
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

CustomDocument.getInitialProps = async (context : DocumentContext) => {
    const originalRenderPage = context.renderPage;
    const cache              = createEmotionCache();

    const { extractCriticalToChunks, } = createEmotionServer(cache);

    context.renderPage = () => originalRenderPage({
        enhanceApp : (App : ComponentType<ComponentProps<AppType> & CustomAppProps>) => props => (
            <App
                emotionCache={cache}
                {...props} />
        ),
    });

    const initialProps  = await Document.getInitialProps(context);
    const emotionStyles = extractCriticalToChunks(initialProps.html);

    const emotionStyleTags = emotionStyles.styles.map(style => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{
                __html : style.css,
            }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};

export default CustomDocument;
