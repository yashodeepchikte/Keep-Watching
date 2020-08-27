
/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
// import chalk from "chalk"


//  Importing components
import {ReactComponent as LoadingSvg} from '../../images/loading.svg';
import {ReactComponent as EggLogo} from "../../images/egg.svg"
import Alerts from "../../components/Alerts/Alerts"

// Importing Context
import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"

import "./Signin.styles.css"

//  Helper function
const validateEmail = (email) =>  {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,4})$/;
    if (reg.test(email) )
    {return (true);}else{return false}
}
 

const SignIn = (props) => {
    const [state, setState] = useState({
        email:"",
        password:""
    })
    const [isValid, setIsValid] = useState({email: false,password: false})
    const [isAllowed, setIsAllowed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const {email, password} = state;

    const authContext = useContext(AuthContext)
    const {isAuthenticated, loadUser, login, loading, setLoadingFalse, setLoadingtrue } = authContext
    
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext

    const togglePassword = (event) => {
        setShowPassword(!showPassword)
        setTimeout(() => setShowPassword(false) , 5000)
    } 

    useEffect(() =>{
        loadUser()
        setLoadingFalse()
        if(isAuthenticated){
            props.history.push("/")
        }

    }, [isAuthenticated, props.history])


    useEffect( () => {



        if(isValid["email"] && isValid["password"]){
            setIsAllowed( () =>  true) 
        }
        else{
            setIsAllowed(() => false)
        }
    }, [isValid])

    const handelChange = (event) => {
        console.clear()

        let name = event.target.name
        let value = event.target.value




        if (name == "email"){

            if (!validateEmail(value)){
                setIsValid(isValid => ({ ...isValid, email:false }) )
            }
            else{
                setIsValid(isValid => ({ ...isValid, email:true }) )
            }

        }else if (name == "password"){

            if(value.length < 6   ){
                setIsValid(isValid => ({ ...isValid, password:false }) )
            }
            else{
                setIsValid(isValid => ({ ...isValid, password:true }) )
            }
    
        }   

        setState(state => ({
            ...state,
            [name]: value
        }))  
    }




 
    const handelSubmit = async (event) => {
        console.clear()
        event.preventDefault()
        setLoadingtrue()
        const email =  event.target.email.value;
        const password = event.target.password.value;

        try {
            if (email==="" || password.length<6){
                setAlert("All fields must be filled in - ")
                setLoadingFalse()
            }
            const response = await login({
                email,
                password
            })
            setLoadingFalse()
        } catch (error) {
            setLoadingFalse()
        }
    }



    return(
    <div className="signin-container">
        <div className="signin">
            <EggLogo className="eggLogo"/>
            <h3>Sign in to keepwatching.io</h3>      
            <form onSubmit={handelSubmit} autocomplete="off">                     
            <div className="inputField">
                    <label className="label" >
                        <span>Email address</span>
                        <span className="red-font">*required</span>
                    </label>
                    <input type="email" name="email" label="Email" onChange={handelChange} value={email} />
                </div>
                <div className="inputField">
                    <label className="label" >
                        <span>Password</span>
                        <span className="red-font">*required</span>
                    </label>
                    <input type={showPassword?"text":"password"} name="password" label="Password" onChange={handelChange} value={password}/>
                    <div className="showPassword" id="showPassEgg" onClick={togglePassword} ><EggLogo className="showPassEgg"/></div>
                </div>
                {   loading ? 
                        <LoadingSvg />
                        :
                        <div className="submit-button">
                            <Alerts />
                            <input type="submit"  value="Sign In" className={isAllowed ?"" :  "notAllowed"}/>
                        </div>
                }
            </form>
                <div className="signUpBlock">
                    Don't  have an account?  <Link to="/signup">Sign Up here</Link>
                </div>
        </div>
    </div>
    )
}

export default SignIn