
/* eslint-disable no-unused-vars */
import React, {useReducer} from "react"

import usersContext from "./userContext"
import userReducer from "./userReducer"

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER,
    USER_LOADED
} from "../types"


const UserState = props =>{
    const initialState={
        currentUser: null,
        currentID: null,
        current_email: null,
        choosen_genre: null,
        current_recommendations: null
    }

    const [state, dispatch] = useReducer(userReducer, initialState)

    // Register user

    //  load user

    //  unload user

    //  Update user details

    //  prediction related actions.....

    return (
        <usersContext.Provider
            value={{
                ...state
            }}
        >
            { props.children }
        </usersContext.Provider>
    )
}

export default UserState
