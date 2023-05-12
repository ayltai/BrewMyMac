export interface Item {
    id           : string,
    name         : string,
    description? : string,
    imageUrl?    : string,
    infoUrl?     : string,
    author?      : string,
    parameter?   : string,
    source       : 'Homebrew' | 'Homebrew Cask' | 'Apple App Store' | 'Tweak',
}
