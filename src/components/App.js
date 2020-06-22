import React from 'react';

//  Importing components
import Header from "./elements/Header"
import Home from "./Home"

//  Importing styles
import {GlobalStyle} from "./styles/GlobalStyle"

const App = () => (
    <>
        <Header />
        <Home />
        <GlobalStyle />
    </>
)


export default App;
