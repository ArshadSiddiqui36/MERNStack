// import logo from './logo.svg';
import './App.css';


// Default...
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

// ..............................................................


import React, { createContext, useReducer } from 'react'
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Errorpage from "./components/Errorpage";

import { initialState, reducer } from "../src/reducer/UseReducer";


// 1: ContextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route>
          <Errorpage />
        </Route>

      </Switch>
  )
}


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>

      <UserContext.Provider value={{state, dispatch}}>

        <Navbar />
        <Routing />

      </UserContext.Provider>

    </>
  )
}

export default App;
