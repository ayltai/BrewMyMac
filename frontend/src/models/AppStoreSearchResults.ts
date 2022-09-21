export type AppStoreSearchResult = {
    artworkUrl60?  : string,
    artworkUrl100? : string,
    artworkUrl512? : string,
    artistName?    : string,
    trackId        : string,
    trackName      : string,
    description?   : string,
    trackViewUrl?  : string,
};

export type AppStoreSearchResults = {
    resultCount : number,
    results     : AppStoreSearchResult[],
};
