import React, {useState, useRef} from "react"

import FontAwesome from "react-fontawesome"

import { StyledSearchBar, StyledSearchBarContent } from "../styles/StyledSearchBar.js"
const SearchBar = ( { callback } ) => {
    const [state, setState] = useState("")
    const timeOut = useRef(null);

    const doSearch = (event) => {
        const { value } = event.target
        
        clearTimeout(timeOut.current)
        setState(value)
        
        timeOut.current = setTimeout(() => callback(value), 500)
    }
    return (
        <StyledSearchBar>
            <StyledSearchBarContent>
                <FontAwesome className="fa-search" name="search" size="2x" />
                <input
                    type="text"
                    placeholder="Search movies"
                    onChange={doSearch}
                    value={state}
                />

            
            </StyledSearchBarContent>
        </StyledSearchBar>
    )
}

export default SearchBar