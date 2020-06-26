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

//  Importing styles
import {GlobalStyle} from "./GlobalStyle"

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact  path="/" component={Home} />
            <Route path="/movie/:movieId" component={Movie}></Route>
            {/* The next route will be called if none of the above urls match up */}
            <Route component={NotFound} />          
        </Switch>
        <Footer />        
        <GlobalStyle />
    </Router>
)


export default App;
