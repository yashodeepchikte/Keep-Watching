import React,  { useReducer} from "react"
import { v4 as uuidv4 } from 'uuid';
import AlertContext from "./AlertContext"
import AlertReducer from "./AlertReducer"

import {
    SET_ALERT,
    REMOVE_ALERT
} from "../types"


const AlertState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(AlertReducer, initialState);


  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: {msg, type, id},
    });

    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
  };
  const removeAlert = (id) => {
    dispatch({type: REMOVE_ALERT, payload: id})
  }

    return(
        <AlertContext.Provider 
          value={{
            alerts: state, 
            setAlert,
            removeAlert
            }}
          >
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState