interface File {
    cellar : string,
    url    : string,
    sha256 : string,
}

interface Bottle {
    files : Record<string, File>[],
}

interface Bottles {
    stable? : Bottle,
}

export interface HomebrewFormula {
    token?     : string,
    name       : string | string[],
    full_name? : string,
    desc?      : string,
    homepage?  : string,
    bottle     : Bottles,
}
