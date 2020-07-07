import React from "react"
import "./selections.css"

const Selections = ({collections, handelClick}) => {
    return(
        <div className="selections">
            {collections.map(collectionName =>  <button value={collectionName} onClick={handelClick} key={collectionName}>{collectionName}</button>)}
        </div>
    )
}

export default Selections