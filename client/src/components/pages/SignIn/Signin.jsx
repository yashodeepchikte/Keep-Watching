import React, {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import chalk from "chalk"

//  Importing components
import CustomInput from "../../components/CustomInput/CustomInput"

// Importing Context
import AuthContext from "../../../context/Authentication/authenticationContext"
import AlertContext from "../../../context/AlertContext/AlertContext"

const SignIn = (props) => {
    const [state, setState] = useState({
        email:"",
        password:""
    })
    const {email, password} = state;

    const authContext = useContext(AuthContext)
    const {isAuthenticated, loadUser, login} = authContext
    
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext

    useEffect(() =>{
        loadUser()

        if(isAuthenticated){
            props.history.push("/")
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history])

    const handelChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handelSubmit = async (event) => {
        event.preventDefault()
        const email =  event.target.email.value;
        const password = event.target.password.value;

        try {
            if (email==="" || password===""){
                setAlert("All fields must be filled in")
            }

            const response = await login({
                email,
                password
            })
            
            // console.log(chalk.green("Response = "+response))

        } catch (error) {
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
            console.log("ther is an error in the catch block for the login.jsx handelSubmit fnuction")
            console.error(error.message)
            console.log("<<<<<<<<<<>>>>>>>>>>>>")
        }
    }



    return(
    <div className="signin-container">
        <h1>Sign in With Email</h1>
        <h3>Don't  have an account? <br /> <Link to="/signup">Sign Up</Link></h3>
        <form onSubmit={handelSubmit}>
            <table>
                <tbody>
                    <CustomInput type="email" name="email" label="Email" handelChange={handelChange} value={email} />
                    <CustomInput type="password" name="password" label="Password" handelChange={handelChange} value={password}/>
                    <CustomInput type="submit" name="" label="" handelChange={handelChange} value="Sign In"/>
                </tbody>
            </table>
        </form>
    </div>
    )
}

export default SignIn