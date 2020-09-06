import React, {useEffect}  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"

//  Importing components
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
//  importing page components
import Alerts from "./components/Alerts/Alerts"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import NotFound from "./pages/NotFound"
import SignUp from "./components/SignUp/SignUp"
import SignIn from "./pages/SignIn/Signin"
import Recommendations from "./pages/recommendations/Recommendations"
import UserPage from "./pages/UserPage/UserPage"

// importing states
 // eslint-disable-next-line
import AuthState from "../context/Authentication/AuthenticationState"
import AlertState from "../context/AlertContext/AlertState"


//  Importing styles
import {GlobalStyle} from "./GlobalStyle"

//  importing utilities
import setAuthToken from "./../utils/setAuthToken"

if(localStorage.token){
    setAuthToken(localStorage.token)
}

const App = () =>{
    useEffect(()=>console.clear(), [])
    return(
            <AlertState>
                <AuthState>
                    <Router>
                        <Header />
                        <Switch>
                            <Route exact  path="/" component={Home} />
                            <Route path="/movie/:movieId" component={Movie} />
                            <Route exact path="/signup"  component={SignUp} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/recommendation" component={Recommendations} />
                            <Route exact path="/user/:userID" component={UserPage} />
                            {/* The next route will be called if none of the above urls match up */}
                            <Route component={NotFound}/>          
                        </Switch>
                        <Footer />        
                        <GlobalStyle />
                    </Router>
                </AuthState>
            </AlertState>
    )

}

export default App;
