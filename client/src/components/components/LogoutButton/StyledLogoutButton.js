imoort React, {useContext, useReducer} from "react"

//  Importing context
import AuthContext from "../../../context/Authentication/authenticationContext"

const LogoutButton = (props) => {
    const authContext = useContext(AuthContext)
    const {logout} = authContext
    return
    <button onClick={logout}>
        Logout
    </button>
}

export default LogoutButton