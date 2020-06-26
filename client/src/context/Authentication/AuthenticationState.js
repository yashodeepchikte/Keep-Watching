import React, {useReducer} from "react"

import AuthContext from "./authenticationContext"
import AuthReducer from "./authenticationReducer"

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS
} from "../types"

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    //  Load user   ----> check for which user is logged in

    //  Register user -----> create user and token

    //  login user  --------> login and create token

    //  logout user --------> Logout the user

    // clear errors      --------> clear the errors

    return (
        <AuthContext.provisder
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error
        }}
        >
            {props.children}
        </AuthContext.provisder>
    )
}

export default AuthState