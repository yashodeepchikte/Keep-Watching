import React from 'react';
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

// importing states
import UserState from "../context/Users/USerState"
import AuthState from "../context/Authentication/AuthenticationState"

//  Importing styles
import {GlobalStyle} from "./GlobalStyle"

const App = () => (
    <AuthState>
        <UserState>
            <Router>
                <Header />
                <Switch>
                    <Route exact  path="/" component={Home} />
                    <Route path="/movie/:movieId" component={Movie}></Route>
                    <Route exact path="/signup"/>
                    {/* The next route will be called if none of the above urls match up */}
                    <Route component={NotFound} component={SignUp}/>          
                </Switch>
                <Footer />        
                <GlobalStyle />
            </Router>
        </UserState>
     </AuthState>
)


export default App;
