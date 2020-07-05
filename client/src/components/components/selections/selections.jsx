import React from "react"



const Selections = (props) => {
    return(
        <div className="selections">
            <button value="actors" onClick={props.handelClick}>Actors</button>
            <button  value="reviews" onClick={props.handelClick}>Reviews</button>
            <button value="similar_movie" onClick={props.handelClick}>Similar Movies</button>
        </div>
    )
}

export default Selections