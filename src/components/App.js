import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"

//  Importing components
import Header from "./elements/Header"
import Home from "./Home"
import Movie from "./Movie.jsx"
import NotFound from "./NotFound"

//  Importing styles
import {GlobalStyle} from "./styles/GlobalStyle"

const App = () => (
    <Router>
        <Header />
        <Switch>
            <Route exact  path="/" component={Home} />
            <Route path="/movie/:movieId" component={Movie}></Route>
            {/* The next route will be called if none of the above urls match up */}
            <Route component={NotFound} />          
        </Switch>
        
        <GlobalStyle />
    </Router>
)


export default App;
