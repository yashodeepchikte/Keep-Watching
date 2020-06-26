import React, { useReducer } from 'react';
import AuthContext from './authenticationContext';
import authReducer from './authenticationReducer';

const AuthState = props => {
    const initialState = {
        shit: "WORKS",
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: false,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //  Load user   ----> check for which user is logged in

    //  Register user -----> create user and token

    //  login user  --------> login and create token

    //  logout user --------> Logout the user

    // clear errors      --------> clear the errors


    return (
        <AuthContext.Provider
          value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthState;






