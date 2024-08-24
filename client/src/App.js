import './App.css';
import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setAuth (boolean){
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try{
      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method: "GET",
        headers: {token : localStorage.token}
      })
      const parseResponse = await response.json();
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    isAuth()
  });

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to = "/dashboard"/> : <Login setAuth={setAuth}/>} />
            <Route path="/register" element={isAuthenticated? <Navigate to = "/dashboard"/> : <Register setAuth={setAuth}/> } />
            <Route path="/dashboard" element={isAuthenticated? <Dashboard setAuth={setAuth}/> : <Navigate to ="/login"/>} />
          </Routes>
          <ToastContainer/>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
