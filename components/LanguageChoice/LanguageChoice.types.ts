export interface LanguageChoiceProps {
    selected?        : string,
    languages        : string[],
    onChange?        : (language : string) => void,
    [ key : string ] : any,
}
