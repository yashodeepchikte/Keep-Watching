 // eslint-disable-next-line
import React, {useContext, useReducer} from "react"

//  Importing context
import AuthContext from "../../../context/Authentication/authenticationContext"

//  importing styling
import "./LogoutButton.styles.css"
const LogoutButton = (props) => {
    const authContext = useContext(AuthContext)
    const {logout} = authContext
    
    return(
   
        <button onClick={logout}    >
            Sign Out
        </button>
  )

}


export default LogoutButton