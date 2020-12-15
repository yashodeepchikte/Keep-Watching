/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
// import chalk from "chalk"

//  import components
import {ReactComponent as LoadingSvg} from '../../images/loading.svg';
import {ReactComponent as EggLogo} from "../../images/egg.svg";

import Alerts from "../Alerts/Alerts"

import "./SignUp.styles.css"



//  importing context
import AlertContext from "../../../context/AlertContext/AlertContext"
import AuthContext from "../../../context/Authentication/authenticationContext"

//  Helper Function
const validateEmail = (email) =>  {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,4})$/;
    if (reg.test(email) )
    {return (true);}else{return false}
}

//  Helper function
const checkAlphabetic = (inputtxt) => {
    var alphabets = /^[a-zA-Z]+$/;
    if(inputtxt.match(alphabets)){ return true;}else{ return false; }
}


const SignUp = (props) =>{
    
    const [state, setState] = useState({
        username:"",
        password:"",
        password2:"",
        fname:"",
        lname:"",
        email:""
    })

    const [isValid, setIsValid] = useState({
        email: false,
        username: false,
        fname: false,
        password: false,
        password2: false
    })
    const [isAllowed, setIsAllowed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const { username, password, password2, fname, lname, email } = state

    const authContext = useContext(AuthContext)
    const { register, isAuthenticated, loadUser, setLoadingtrue, setLoadingFalse, loading} = authContext
    
    const alertContext = useContext(AlertContext)
    const setAlert = alertContext.setAlert;
    


   
    const togglePassword = (event) => {
        setShowPassword(showPassword=>!showPassword)
        setTimeout(() => setShowPassword(false) , 6000)
    } 
    const togglePassword2 = (event) => {
        setShowPassword2(showPassword2=>!showPassword2)
        setTimeout(() => setShowPassword2(false) , 6000)
    } 


    useEffect( () =>{
        loadUser();
        if(isAuthenticated){
            props.history.push("/");
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history])

    useEffect(() => {

        if(isValid["email"]  && isValid["username"] && isValid["fname"] && isValid["password"] && isValid["password2"]){
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



        //  in the next if else if statements put the validation statements
        if(name=="email"){

            if(!validateEmail(value)){
                setIsValid(isValid => ({...isValid, email: false}) )
            }else{
                setIsValid(isValid => ({...isValid, email: true}) )
            }

        }else if(name =="username"){

            if(value.length > 3){
                setIsValid(isValid => ({...isValid, username: true}) )
            }else{
                setIsValid(isValid => ({...isValid, username: false}) )
            }
     
        }else if(name =="fname"){


            if(value.length > 0 ){
                setIsValid(isValid => ({...isValid, fname: true}) )
            }else{
                setIsValid(isValid => ({...isValid, fname: false}) )
            }

        }else if(name =="password"){

            if(value.length < 6){
                setIsValid(isValid => ({...isValid, password: false}) )
            }else{
                setIsValid(isValid => ({...isValid, password: true}) )
            }

        }else if(name =="password2"){

            if(value.length < 6){
                setIsValid(isValid => ({...isValid, password2: false}) )
            }else{
                setIsValid(isValid => ({...isValid, password2: true}) )
            }

        }

        //  Now set the state
        setState(state => ({
            ...state,
            [name]: value
        }))
    
    }

    const handelSubmit = async (event) => {
        console.clear()
        event.preventDefault()
        setLoadingtrue()
        console.log("got the data = ", event.target)

        try {
            const email = event.target.email.value
            const fname = event.target.fname.value
            const lname = event.target.lname.value
            const password = event.target.password.value
            const password2 = event.target.password2.value
            const username = event.target.username.value
            const gener = event.target.gener
            let generPreference = []


            if(username==="" || password==="" || email===""){
                setAlert("Please enter all the fields", "danger")
                setLoadingFalse()
            }else if(password !== password2){
                setAlert("Passwords do not match", "danger")
                setLoadingFalse()
            }else if(!checkAlphabetic(fname)){
                setAlert("The First Name must not contain numbers, spaces or special characters", "danger")
                setLoadingFalse()
            }
            else if(password.length < 6){
                setAlert("Password must be atleast 6 characters")
                setLoadingFalse()
            }

            else{
                setLoadingtrue()
                console.log("---<> making the server request <> ---")
                console.log(typeof(register))
                const response = await register({
                    email,
                    fname, lname,
                    password, password2,
                    username,
                    generPreference
                })
                console.log("response = ", response )
                const token = response.data.token
                console.log("Token = ", token)
                setLoadingFalse()
            }
           
        } catch (error) {
            
            console.error("error message = ", error.message)
            console.log("some error in the catch block  of the signup component \n")

        }
    }

    return(
        <div className="signin-container">
            <div className="signin">
                <EggLogo className="eggLogo"/>
                <h3>Sign Up to keepwatching.io</h3>
                <a name="#top" id="top"></a>
                <form onSubmit={handelSubmit} autocomplete="off">
                    {/* <CustomImput type="email" name="email" label="Email" handelChange={handelChange} value={email}/> */}
                    <div className="inputField">
                        <label className="label" >
                            <span>Email address</span>
                            <span className="red-font">*email is required</span>
                        </label>
                         <input type="email" name="email" label="Email" onChange={handelChange} value={email} />
                    </div>
                    {/* <Cu stomImput type="text" name="username" label="Username" handelChange={handelChange} value={username}/> */}
                    <div className="inputField">
                        <label className="label" >
                            <span>Username</span>
                            <span className="red-font">*required</span>
                        </label>
                         <input type="text" name="username" label="Username" onChange={handelChange} value={username} />
                    </div>
                    {/* <CustomImput type="text" name="fname" label="First Name" handelChange={handelChange} value={fname}/> */}
                    <div className="inputField">
                        <label className="label" >
                            <span>First Name</span>
                            <span className="red-font">*required</span>
                        </label>
                         <input type="text" name="fname" label="First Name" onChange={handelChange} value={fname} />
                    </div>
                    {/* <CustomImput type="text" name="lname" label="Last Namel" handelChange={handelChange} value={lname}/> */}
                    <div className="lname">
                        <label className="label" >
                            <span>Last Name</span>
                            <span className="red-font"></span>
                        </label>
                         <input type="text" name="lname" label="Last Namel" onChange={handelChange} value={lname} />
                    </div>
                    {/* <CustomImput type="password" name="password" label="Password" handelChange={handelChange} value={password}/> */}
                    <div className="inputField">
                        <label className="label" >
                            <span>Password</span>
                            <span className="red-font">*required</span>
                        </label>
                        <input type={showPassword?"text":"password"} name="password" label="Password" onChange={handelChange} value={password}/>
                        <div className="showPassword" id="showPassEgg" onClick={togglePassword} ><EggLogo className="showPassEgg"/></div>
                        {/* <span className={ showTooltip ? "tooltip" : "tooltip notvisible"} >Show Password</span> */}
                    </div>
                    {/* <CustomImput type="password" name="password2" label="Confirm Password" handelChange={handelChange} value={password2}/>     */}
                    <div className="inputField">
                        <label className="label" >
                            <span>Confirm Password</span>
                            <span className="red-font">*required</span>
                        </label>
                        <input type={showPassword2?"text":"password"} name="password2" label="Password" onChange={handelChange} value={password2}/>
                        <div className="showPassword" id="showPassEgg" onClick={togglePassword2} ><EggLogo className="showPassEgg"/></div>
                        {/* <span className={ showTooltip ? "tooltip" : "tooltip notvisible"} >Show Password</span> */}
                    </div>
                    {/* <GenerPreference />           */}
                        {/* <CustomImput type="submit" name="" label="" handelChange={handelChange} value="Sign Up"/> */}
                    {
                        loading ? 
                        <LoadingSvg /> 
                                :
                        <div className="submit-button">
                            <a href="#top">
                                <Alerts />
                                <input type="submit"  value="Sign Up" className={isAllowed ?"" :  "notAllowed"}  />
                            </a>
                        </div>
                    }
                
                </form>
                <div className="signUpBlock">
                    Already  have an account?  <Link to="/signin">Sign In here</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp