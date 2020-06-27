import React, {useContext, useReducer} from "react"

//  Importing context
import AuthContext from "../../../context/Authentication/authenticationContext"

const LogoutButton = (props) => {
    const authContext = useContext(AuthContext)
    const {logout} = authContext
    
    return(
    <div>
        <button onClick={logout}>
            Logout
        </button>
    </div>)

}


export default LogoutButton