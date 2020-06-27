import React, { useReducer, useContext } from "react"
import chalk from "chalk"


//  Importing context
import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"
import Axios from "axios"

const SignInWithGoogle =  () => {
    const authContext = useContext(AuthContext)
    const {signInWithGoogle} = authContext
    return(<div ><button onClick={signInWithGoogle}>Signin with Google </button>
    <a href="http://localhost:5000/api/auth/google">Signin with google Link</a>
    </div>)
}

export default SignInWithGoogle