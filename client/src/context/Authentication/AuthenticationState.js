// import React, { useReducer, useContext } from 'react';
import React, { useReducer, useContext } from "react"

import AuthContext from './authenticationContext';
import authReducer from './authenticationReducer';
import axios from "axios"
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR } from '../types';

import setAthToken from "../../utils/setAuthToken"
// import AlertContext from "../AlertContext/AlertContext"
import AlertContext from "../AlertContext/AlertContext"

const AuthState = (props) => {

	const alertContext = useContext(AlertContext)
	// console.log("alert Context = ", alertContext)
	// console.log("SetAlert = ", alertContext.setAlert)
	const  setAlert = alertContext.setAlert 
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);
	

	
    //  Load user   ----> check for which user is logged in
    const loadUser = async () => {
		//  --------> for authentication to work we need to store the token in global header with key
		//  ---------> X-auth-token
		if (localStorage.token){				//-------> if a token exists in the local storage set it to global header
			setAthToken(localStorage.token);     // ---> utility function  
		}
		try {
			const res = await axios.get("/api/auth");		// this will add user to the res.data is token is valid
			
			//  this code will run only if above request is successful
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		} catch (error) {
			//  this code will run if the authentication goes wrong
			dispatch({
				type: AUTH_ERROR
			})
		}
	}
    //  Register user -----> create user and token
    const register = async formData => {
		const config = {
		headers:
		{
			"Content-Type": "application/json"
		} 
		}

		try {
			const res = await axios.post("/api/users/", formData, config)
			dispatch(
				{
				type: REGISTER_SUCCESS,
				payload: res.data
				}
			)
			loadUser()
			return res
		} catch (error) {
			console.log("ERROR IN authenticationstate.js in the register function catch block")
			console.log("error = ", error.response.data.msg)
			setAlert(error.response.data.msg, "danger")
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg
			})
		}
    }


    //  login user  --------> login and create token
    const login = () => console.log("Login")

    //  logout user --------> Logout the user
    const logout = () => console.log("Logout")

    // clear errors      --------> clear the errors
    const clearErrors = () => console.log("Clear errors")


    return (
        <AuthContext.Provider
          value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            login,
            logout,
            clearErrors,
            loadUser
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthState;






