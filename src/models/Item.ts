export type Item = {
    id           : string,
    name         : string,
    description? : string,
    imageUrl?    : string,
    author?      : string,
    parameter?   : string | number | boolean,
    source       : 'Homebrew' | 'Homebrew-Cask' | 'App Store' | 'Tweak',
};
