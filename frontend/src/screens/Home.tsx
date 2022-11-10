import mixpanel from 'mixpanel-browser';
import { InstallDesktop, } from '@mui/icons-material';
import { Badge, Box, Grid, IconButton, styled, ToggleButton, Tooltip, } from '@mui/material';
import { render, } from 'ejs';
import React, { useCallback, useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { ActionBar, FilteredItemGrid, Loading, PopUpFooter, SearchBox, } from '../components';
import { BREWMYMAC_API_ENDPOINT, } from '../constants';
import { useAppSelector, } from '../hooks';

import { SessionDetail, } from './SessionDetail';

const FlexBox = styled(Box)`
    height         : 100%;
    display        : flex;
    flex-direction : column;
`;

const RightAlignedToggleButton = styled(ToggleButton)(({ theme, }) => ({
    marginLeft : theme.spacing(2),
    float      : 'right',
}));

const RightAlignedIconButton = styled(IconButton)(({ theme, }) => ({
    marginLeft : theme.spacing(2),
    float      : 'right',
}));

export const Home = () => {
    const session = useAppSelector(state => state.session);

    const [ filter,            setFilter,            ] = useState<string>('');
    const [ inProgress,        setInProgress,        ] = useState<boolean>(false);
    const [ showSelected,      setShowSelected,      ] = useState<boolean>(false);
    const [ savedSessionId,    setSavedSessionId,    ] = useState<string | undefined>();
    const [ showSessionDetail, setShowSessionDetail, ] = useState<boolean>(false);

    const { t, } = useTranslation();

    const handleStatusChange = useCallback(() => (isInProgress : boolean) => setInProgress(isInProgress), [ setInProgress, ]);

    const handleSearch = useCallback(() => (keyword? : string) => setFilter(keyword || ''), [ setFilter, ]);

    const handleToggleShowSelected = () => setShowSelected(!showSelected);

    const handleInstall = async () => {
        setSavedSessionId(undefined);
        setShowSessionDetail(true);

        const file     = await fetch('/data/install.sh.ejs');
        const template = await file.text();

        const script = render(template, {
            items : session.items,
        });

        const response = await fetch(`${BREWMYMAC_API_ENDPOINT}/api/sessions`, {
            method  : 'POST',
            headers : {
                'Content-Type' : 'text/plain',
            },
            body    : script,
        });

        setSavedSessionId(await response.text());
    };

    const handleCloseSession = useCallback(() => {
        setShowSessionDetail(false);
        setSavedSessionId(undefined);
    }, [ setSavedSessionId, setShowSessionDetail, ]);

    useEffect(() => {
        mixpanel.track('Page View - Home');
    }, []);

    return (
        <>
            <PopUpFooter />
            <FlexBox>
                <ActionBar
                    title={t('app_name')}
                    centerComponent={
                        <SearchBox
                            inProgress={inProgress}
                            onSearch={handleSearch} />
                    }
                    rightComponent={
                        <>
                            <Tooltip title={t('action_install')}>
                                <span>
                                    <RightAlignedIconButton
                                        disabled={session.items.length === 0}
                                        onClick={handleInstall}>
                                        {session.items.length > 0 && (
                                            <Badge
                                                color='primary'
                                                badgeContent={session.items.length}>
                                                <InstallDesktop />
                                            </Badge>
                                        )}
                                        {session.items.length === 0 && <InstallDesktop />}
                                    </RightAlignedIconButton>
                                </span>
                            </Tooltip>
                            <RightAlignedToggleButton
                                size='small'
                                color='primary'
                                value='show-selected'
                                selected={showSelected}
                                onChange={handleToggleShowSelected}>
                                {t('label_show_selected')}
                            </RightAlignedToggleButton>
                        </>
                    } />
                <Grid
                    container
                    paddingX={2}
                    paddingTop={2}
                    paddingBottom={8}
                    spacing={2}>
                    <FilteredItemGrid
                        selectedOnly={showSelected}
                        filter={filter}
                        onStatusChange={handleStatusChange} />
                </Grid>
                {showSessionDetail && savedSessionId && (
                    <SessionDetail
                        sessionId={savedSessionId}
                        items={session.items}
                        onClose={handleCloseSession} />
                )}
                {showSessionDetail && !savedSessionId && <Loading />}
            </FlexBox>
        </>
    );
};
