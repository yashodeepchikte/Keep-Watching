import React, {useState, useContext, useEffect} from "react"
import chalk from "chalk"

//  import components
import CustomImput from "../CustomInput/CustomInput"
import GenerPreference from "../GenerSelection/generSelection"
import {StyledSignedUp} from "./StyledSignUp"
import {ReactComponent as LoadingSvg} from '../../images/loading.svg';


//  importing context
import AlertContext from "../../../context/AlertContext/AlertContext"
import AuthContext from "../../../context/Authentication/authenticationContext"

const SignUp = (props) =>{
    const authContext = useContext(AuthContext)
    const { register, isAuthenticated, loadUser,    
                setLoadingtrue, setLoadingFalse, loading} = authContext
    
    // console.log("AlertContext inside the signup is =", AlertContext)
    // console.log("alert context inside the signup is =", alertContext)
    const alertContext = useContext(AlertContext)
    const setAlert = alertContext.setAlert;
    
    useEffect( () =>{
        loadUser();

        if(isAuthenticated){
            props.history.push("/");
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history])

    const [user, setUser] = useState({
        username:"",
        password:"",
        password2:"",
        fname:"",
        lname:"",
        email:""
    })

    const { username, password, password2, fname, lname, email } = user

    const handelChange = (event) => {
        setUser(
            
            {...user,
            [event.target.name] : event.target.value
           } 
           )
    }

    const handelSubmit = async (event) => {
        event.preventDefault()
        setLoadingtrue()
        
        try {
            const email = event.target.email.value
            const fname = event.target.fname.value
            const lname = event.target.lname.value
            const password = event.target.password.value
            const password2 = event.target.password2.value
            const username = event.target.username.value
            const gener = event.target.gener
            let generPreference = []

            for(let i = 0; i< 16; i++){
                if (gener[i].checked){
                    generPreference.push(gener[i].value)
                }
            }
            


            if(username==="" || password==="" || email===""){
                setAlert("Please enter all the fields", "danger")
                setLoadingFalse()
            }else if(password !== password2){
                setAlert("Passwords do not match", "danger")
                setLoadingFalse()
            }else if(password.length < 6){
                setAlert("Password must be atleast 6 characters")
                setLoadingFalse()
            }else if(generPreference.length < 2){
                setAlert("Select at least 3 gener")
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
            
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
            console.error("error message = ", error.message)
            console.log("some error in the catch block  of the signup component \n")
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
        }
    }

    return(
        <StyledSignedUp>
        <div className="signup-continer">
            <h1>Signup with Email</h1>
            <form onSubmit={handelSubmit}>
                <table>
                <tbody>
                <CustomImput type="email" name="email" label="Email" handelChange={handelChange} value={email}/>
                <CustomImput type="text" name="username" label="Username" handelChange={handelChange} value={username}/>
                <CustomImput type="text" name="fname" label="First Name" handelChange={handelChange} value={fname}/>
                <CustomImput type="text" name="lname" label="Last Namel" handelChange={handelChange} value={lname}/>
                <CustomImput type="password" name="password" label="Password" handelChange={handelChange} value={password}/>
                <CustomImput type="password" name="password2" label="Confirm Password" handelChange={handelChange} value={password2}/>    
                <GenerPreference />          
                {
                    loading ? 
                    <tr>
                    <td>
                    <LoadingSvg /> 
                    </td>

                    </tr>
                    :
                    <CustomImput type="submit" name="" label="" handelChange={handelChange} value="Sign Up"/>
                }
                </tbody>
                </table>
            </form>
            </div>
        </StyledSignedUp>
    )
}

export default SignUp