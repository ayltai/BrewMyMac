import { InstallDesktop, } from '@mui/icons-material';
import { Badge, Box, Grid, IconButton, styled, ToggleButton, } from '@mui/material';
import { render, } from 'ejs';
import { useGA4React, } from 'ga-4-react';
import React, { useEffect, useState, } from 'react';
import { useTranslation, } from 'react-i18next';
import { v4, } from 'uuid';

import { ActionBar, FilteredItemGrid, Loading, SearchBox, } from '../components';
import { useAppSelector, } from '../hooks';
import type { Session, } from '../models';

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
    const ga      = useGA4React();
    const session = useAppSelector(state => state.session);

    const [ filter,            setFilter,            ] = useState<string>('');
    const [ inProgress,        setInProgress,        ] = useState<boolean>(false);
    const [ showSelected,      setShowSelected,      ] = useState<boolean>(false);
    const [ savedSession,      setSavedSession,      ] = useState<Session | undefined>();
    const [ showSessionDetail, setShowSessionDetail, ] = useState<boolean>(false);

    const { t, } = useTranslation();

    const handleStatusChange = (isInProgress : boolean) => setInProgress(isInProgress);

    const handleSearch = (keyword? : string) => setFilter(keyword || '');

    const handleToggleShowSelected = () => setShowSelected(!showSelected);

    const handleInstall = async () => {
        setSavedSession(undefined);
        setShowSessionDetail(true);

        const file     = await fetch('/data/install.sh.ejs');
        const template = await file.text();

        const script = render(template, {
            items : session.items,
        });

        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:bt-93slL/sessions', {
            method  : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body    : JSON.stringify({
                sessionId : v4(),
                script,
            }),
        });

        setSavedSession(await response.json());
    };

    const handleCloseSession = () => {
        setShowSessionDetail(false);
        setSavedSession(undefined);
    };

    useEffect(() => {
        if (ga) ga.pageview('/');
    }, [ ga, ]);

    return (
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
                padding={2}
                spacing={2}>
                <FilteredItemGrid
                    selectedOnly={showSelected}
                    filter={filter}
                    onStatusChange={handleStatusChange} />
            </Grid>
            {showSessionDetail && savedSession && (
                <SessionDetail
                    session={savedSession}
                    items={session.items}
                    onClose={handleCloseSession} />
            )}
            {showSessionDetail && !savedSession && <Loading />}
        </FlexBox>
    );
};
