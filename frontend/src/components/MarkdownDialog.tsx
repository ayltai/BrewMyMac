import Markdown from 'markdown-to-jsx';
import React, { useEffect, useState, } from 'react';

import { handleError, } from '../utils';

import { PopUpDialog, } from './PopUpDialog';

export const MarkdownDialog = ({
    title,
    markdownFilePath,
    onClose,
} : {
    title            : string,
    markdownFilePath : string,
    onClose?         : () => void,
}) => {
    const [ content, setContent, ] = useState<string>('');

    const fetchContent = async () => {
        const file = await fetch(markdownFilePath);

        return await file.text();
    };

    useEffect(() => {
        fetchContent().then(setContent).catch(handleError);
    }, []);

    return (
        <PopUpDialog
            open
            title={title}
            onClose={onClose}>
            <Markdown>{content}</Markdown>
        </PopUpDialog>
    );
};
