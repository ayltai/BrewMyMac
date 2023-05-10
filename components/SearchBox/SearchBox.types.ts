export interface SearchBoxProps {
    isLoading?      : boolean,
    initialKeyword? : string,
    hint?           : string,
    onSearch?       : (search? : string) => void,
}
