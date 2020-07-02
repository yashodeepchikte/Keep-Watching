import React, {useEffect, useContext} from "react"
import axios from "axios"

//  importing context 
import AuthContext from "../../../context/Authentication/authenticationContext"
const Recommendations =() => {
    const authContext = useContext(AuthContext)
    const {user, loading, setLoadingtrue, setLoadingFalse} = authContext;

}