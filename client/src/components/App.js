import React  from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"

//  Importing components
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
//  importing page components
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import NotFound from "./pages/NotFound"
import SignUp from "./components/SignUp/SignUp"
import Alerts from "./components/Alerts/Alerts"

// importing states
import UserState from "../context/Users/USerState"
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
    
    return(
     <AlertState>
        <AuthState>
            <UserState>
                <Router>
                    <Header />
                    <Alerts />
                    <Switch>
                        <Route exact  path="/" component={Home} />
                        <Route path="/movie/:movieId" component={Movie}></Route>
                        <Route exact path="/signup"  component={SignUp}/>
                        {/* The next route will be called if none of the above urls match up */}
                        <Route component={NotFound}/>          
                    </Switch>
                    <Footer />        
                    <GlobalStyle />
                </Router>
            </UserState>
        </AuthState>
        </AlertState>
    )

}

export default App;
