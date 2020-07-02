import React, {useContext, useReducer} from "react"

//  Importing context
import AuthContext from "../../../context/Authentication/authenticationContext"

//  importing styling
import "./LogoutButton.styles.css"
const LogoutButton = (props) => {
    const authContext = useContext(AuthContext)
    const {logout} = authContext
    
    return(
    <div className="logOutButton">
        <button onClick={logout} >
            Logout
        </button>
    </div>)

}


export default LogoutButton