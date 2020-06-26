import React, {useState} from "react"
// import axios from "axios"

const SignUp = () =>{

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

    const handelSubmit = (event) => {
        console.log("submit button was clicked")
    }

    return(
        <div>
            <h1>Signup with Email</h1>
            <form onSubmit={handelSubmit}>
                
                <div className="from-group">
                    <label htmlFor="name">Email</label>
                    <input type="text" name="email" value={email} onChange={handelChange} />
                </div>      
                
                <div className="from-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" value={username} onChange={handelChange} />
                </div>  

                <div className="from-group-2">
                    <label htmlFor="name">First Name</label>
                    <input type="text" name="fname" value={fname} onChange={handelChange} />
                </div>      

                <div className="from-group-2">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" name="lname" value={lname} onChange={handelChange} />
                </div>      

                <div className="from-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handelChange} />
                </div>   

                <div className="from-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={handelChange} />
                </div>      

                <div className="from-group">
                    <input type="submit" value="SignUp" className="submit-btn"/>
                </div>   
            </form>
        </div>
    )
}

export default SignUp