import React, {Fragment, useState, useEffect} from 'react'
import {toast} from "react-toastify";

function Dashboard({setAuth}) {

  const [name, setName] = useState("");

  async function getName() {
    try{
      const response = await fetch("http://localhost:5000/dashboard/",{
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseResponse = await response.json();
      setName(parseResponse.user_name);
    }catch(err){
      console.error(err.message)
    }    
  }

  useEffect(()=>{
    getName()
  }, []);


  function logout(e){
    e.preventDefault();
    localStorage.removeItem("token")
    setAuth(false);
    toast.success("Successfully logged out!")
  }

  return (
    <Fragment>
        <h1>Dashboard</h1>
        <h2>Hello {name}!</h2>
        <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
    </Fragment>
  )
}

export default Dashboard;