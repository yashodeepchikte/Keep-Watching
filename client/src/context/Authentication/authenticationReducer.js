import {useContext} from "react" // eslint-disable-next-line
import axios from "axios"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
	SET_ALERT,
	SET_LOADING_FALSE,
	SET_LOADING_TRUE
  } from '../types';


  export default (state, action) => {
    switch (action.type) {

		case SET_LOADING_FALSE:
			return{
				...state,
				loading: false
			}
		case SET_LOADING_TRUE:
			return{
				...state,
				loading: true
			}
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
      	case REGISTER_FAIL:
		case AUTH_ERROR:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};
		case LOGOUT:
			delete axios.defaults.headers.common ["x-auth-token"]
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };

