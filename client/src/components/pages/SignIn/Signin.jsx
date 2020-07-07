
/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
// import chalk from "chalk"


//  Importing components
import CustomInput from "../../components/CustomInput/CustomInput"
import SigninWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle"
import {ReactComponent as LoadingSvg} from '../../images/loading.svg';
import {ReactComponent as EggLogo} from "../../images/egg.svg"
// Importing Context
import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"

import "./Signin.styles.css"

const SignIn = (props) => {
    const [state, setState] = useState({
        email:"",
        password:""
    })
    const [isValid, setIsValid] = useState({email: false,password: false})
    const [isAllowed, setIsAllowed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showTooltip, setShowToolTIp] = useState(false)
    const {email, password} = state;

    const authContext = useContext(AuthContext)
    const {isAuthenticated, loadUser, login, loading, setLoadingFalse, setLoadingtrue } = authContext
    
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext

    useEffect(() =>{
        loadUser()
        setLoadingFalse()
        if(isAuthenticated){
            props.history.push("/")
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history])

    const validateEmail = (email) =>  {
        
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,4})$/;
        //var address = document.getElementById[email].value;
        if (reg.test(email) )
        {
            // alert('Invalid Email Address');
            return (true);
        }else{
            return false
        }

    }
    useEffect(() => {console.log("third use effect called")}, [isValid, isAllowed])

    useEffect(()=>{
        console.clear()
        
        const email_state = state.email
        const password_state = state.password
        
        console.log("state = ", state)
        console.log("email = ", email_state)
        console.log("pasword = ", password_state)
        console.log("password_state === 6", password_state.length === 6)
        console.log("password_state < 6", password_state.length < 6)

        console.log("password length = ", password_state.length)
        console.log("valid email = ",validateEmail(email_state) )
        if (!validateEmail(email_state)){
            setIsValid(isValid => ({ ...isValid, email:false }) )
        }
        else{
            setIsValid(isValid => ({ ...isValid, email:true }) )
        }

        if(password_state.length < 5){
            console.log("password_state.length < 6 ==>>", password_state.length < 6)
            setIsValid(isValid => ({ ...isValid, password:false }) )
        }
        else{
            console.log("password_state.length < 6 ==<><><>", password_state.length < 6)
          
                setIsValid(isValid =>{ console.log("setting is valid to true ") ; return({ ...isValid, password:true })} )
            
        }

        if(isValid["email"] && isValid["password"]){
            setIsAllowed( () =>  true) 
        }
        else{
            setIsAllowed(() => false)
        }

        console.log("isValid = ", isValid)
        console.log("is allowed = ", isAllowed)
    
    }, [state])
    

    const handelChange = (event) => {

        event.persist()
        console.log("event.target = ", event.target )
        setState(state => ({
            ...state,
            [event.target.name]: event.target.value
        }))       
    }
    const togglePassword = (event) => {
        setShowPassword(!showPassword)
        setTimeout(() => setShowPassword(false) , 5000)
    } 
    const toolTipTrue = () => setShowToolTIp(true)
    const toolTIpFalse = () => setShowToolTIp(false)

 
    const handelSubmit = async (event) => {
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
            // console.log(chalk.green("Response = "+response))

        } catch (error) {
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
            console.log("ther is an error in the catch block for the login.jsx handelSubmit fnuction")
            console.error(error.message)
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
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
                        <span className="red-font">*email is required</span>
                    </label>
                    <input type="email" name="email" label="Email" onChange={handelChange} value={email} />
                </div>
                <div className="inputField">
                    <label className="label" >
                        <span>Password</span>
                        <span className="red-font">*Password is required</span>
                    </label>
                    <input type={showPassword?"text":"password"} name="password" label="Password" onChange={handelChange} value={password}/>
                    <div className="showPassword" id="showPassEgg" onClick={togglePassword} onMouseOver={toolTipTrue} onMouseOut={toolTIpFalse}><EggLogo className="showPassEgg"/></div>
                    <span className={ showTooltip ? "tooltip" : "tooltip notvisible"} >Show Password</span>
                </div>
                {   loading ? 
                        <LoadingSvg />
                        :
                        <div className="submit-button">
                            <input type="submit"  value="Sign In" className={isAllowed ?"" :  "notAllowed"}/>
                        </div>
                }
            </form>
                <div className="signUpBlock">
                    Don't  have an account?  <Link to="/signup">Sign Up here</Link>
                </div>
        </div>
        <div>
            {/* <SigninWithGoogle /> */}
        </div>
    </div>
    )
}

export default SignIn