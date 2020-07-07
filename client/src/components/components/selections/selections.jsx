import React from "react"
import "./selections.css"

const Selections = ({collections, handelClick}) => {
    return(
        <div className="selections">
            <div className="selections-container">
                {collections.map(collectionName =>  <button value={collectionName} onClick={handelClick} key={collectionName} className="selections-item">{collectionName}</button>)}
            </div>
        </div>
    )
}

export default Selections