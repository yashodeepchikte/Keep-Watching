 // eslint-disable-next-line
import React, { useReducer, useContext } from "react"
 // eslint-disable-next-line
import chalk from "chalk"


//  Importing context
import AuthContext from "../../../context/Authentication/authenticationContext"
 // eslint-disable-next-line
import AlertContext from "../../../context/AlertContext/AlertContext"
// eslint-disable-next-line
import Axios from "axios"

const SignInWithGoogle =  () => {
    const authContext = useContext(AuthContext)
    const {signInWithGoogle} = authContext
    return(<div ><button onClick={signInWithGoogle}>Signin with Google </button>
    <a href="http://localhost:5000/api/auth/google">Signin with google Link</a>
    </div>)
}

export default SignInWithGoogle