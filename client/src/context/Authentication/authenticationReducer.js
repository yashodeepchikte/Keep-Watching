// eslint-disable-next-line
import {useContext} from "react" 
import axios from "axios"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
	LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
	SET_LOADING_FALSE,
	SET_LOADING_TRUE,
	UPDATE_USER
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
		     // eslint-disable-next-line
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
	case UPDATE_USER:
		return{
			...state,
			user: action.payload
		}
      default:
        return state;
    }
  };

