/* eslint-disable react/prop-types */
import { useState } from "react";
import { SearchContext } from "..";


function SearchCtxProvider({ children }) {
    const [searchEnable, setSearchEnable] = useState(false);
    return (
        <SearchContext.Provider value={{ searchEnable, setSearchEnable }}>
            {children}
        </SearchContext.Provider>
    )
}




export default SearchCtxProvider;